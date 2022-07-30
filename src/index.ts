import { Hono } from 'hono'
import { APIMessageInteraction, InteractionType, InteractionResponseType, APIApplicationCommandInteraction, APIMessageComponentInteraction, } from 'discord-api-types/v10'
import { verifyKey } from 'discord-interactions'
import { AutoCompleteInteractionType, DualAutocompleteInteraction, DualModalSubmitInteraction } from './lib/types'
import { REGISTERED_COMMANDS, REGISTERED_COMPONENT_INTERACTIONS, REGISTERED_MODAL_INTERACTIONS, FALLBACK_COMMANDS, FALLBACK_COMPONENT_INTERACTIONS, FALLBACK_MODAL_INTERACTIONS, REGISTERED_AUTO_COMPLETE } from './registered'
import { register_commands } from './lib/scripts/register'
interface Env {
	BOT_TOKEN: string,
	PUBKEY: string,
	APPLICATION_ID: string,
	DEVSECRET?: string // the secret code 
}

const app = new Hono<Env>()
app.get('/', (c) => c.text('Powered by worker-discord-template'))

app.post('/', async (c) => {
	const text = await c.req.text()
	// Verification
	const signature = c.req.headers.get('x-signature-ed25519')
	const timestamp = c.req.headers.get('x-signature-timestamp')
	const isValidRequest = verifyKey(text, signature, timestamp, c.env.PUBKEY)
	const secretheader = c.req.headers.get('secret-key')

	if (!(c.env.DEVSECRET != null && c.env.DEVSECRET.length > 0 && secretheader == c.env.DEVSECRET) && !isValidRequest)
		return c.text('Invalid request signature', 401)


	const json = JSON.parse(text)
	const message = json as APIMessageInteraction


	switch (message.type) {
		case InteractionType.Ping: {
			return c.json({
				type: InteractionResponseType.Pong
			})
		}

		case InteractionType.ApplicationCommand: {
			const data = json as APIApplicationCommandInteraction
			const commandName = data.data.name
			const query = REGISTERED_COMMANDS.filter(commands => commands.data.name == commandName)
			if (query.length == 0) return c.json(await FALLBACK_COMMANDS(data))

			return c.json(await query[0].handle(data))
		}

		case InteractionType.ApplicationCommandAutocomplete: {
			// TODO: This is too expensive and dirty man.
			const data = json as DualAutocompleteInteraction
			const queries = REGISTERED_AUTO_COMPLETE.map(single => new Promise((resolve) => {
				single.check.check(data).then(res => {
					if (res) resolve(single)
					resolve(null)
				})
			})) as Promise<AutoCompleteInteractionType | null>[]
			const check = await Promise.all(queries)
			const result = check.filter(single => single != null)
			if (result.length > 0) return c.json(await (result[0] as unknown as AutoCompleteInteractionType).handle(data))
		}

		case InteractionType.MessageComponent: {
			const data = json as APIMessageComponentInteraction
			const customId = data.data.custom_id

			const query1 = REGISTERED_COMPONENT_INTERACTIONS.filter(single => single.data.text == customId)
			if (query1.length > 0) return c.json(await query1[0].handle(data))

			const query2 = REGISTERED_COMPONENT_INTERACTIONS.filter(single => single.data.regex?.test(customId) ?? false)
			if (query2.length > 0) return c.json(await query2[0].handle(data))

			return c.json(await FALLBACK_COMPONENT_INTERACTIONS(data))
		}

		case InteractionType.ModalSubmit: {
			const data = json as DualModalSubmitInteraction
			const customId = data.data.custom_id
			const query1 = REGISTERED_MODAL_INTERACTIONS.filter(single => single.data.text == customId)
			if (query1.length > 0) return c.json(await query1[0].handle(data))

			const query2 = REGISTERED_MODAL_INTERACTIONS.filter(single => single.data.regex?.test(customId) ?? false)
			if (query2.length > 0) return c.json(await query2[0].handle(data))

			return c.json(await FALLBACK_MODAL_INTERACTIONS(data))
		}

		default: {
			console.error('Invalid message type shown:', message.type)
			return c.text(`Invalid message type shown: ${message.type}`, 403)
		}
	}
})


app.all('/register', (c) => {
	const secretheader = c.req.headers.get('secret-key')
	if (secretheader == c.env.DEVSECRET) {
		register_commands(c.env.APPLICATION_ID, c.env.BOT_TOKEN)
		return c.text("Registered commands")
	}

	return c.text("insert your `DEVSECRET` env on `secret-key` header to register commands.")
})
export default app