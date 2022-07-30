import { REGISTERED_COMMANDS } from './../../registered'
import { RouteBases } from 'discord-api-types/v10'
export async function register_commands(applicationId: String, token: String, enableLogging = true) {
    for (var command of REGISTERED_COMMANDS) {
        console.log(command.data)
        const request = await fetch(`${RouteBases.api}/applications/${applicationId}/commands`, {
            method: 'POST',
            headers: {
                'Authorization': `Bot ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(command.data)
        })
        if (request.status != 201) throw `${command.data.name} updated or didnt registered: ${await request.text()}`
        if (enableLogging) console.log(`Successfully Registered ${command.data.name}`)
    }
}