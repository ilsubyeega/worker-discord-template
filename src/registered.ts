import { CommandInteractionType, CommandInteractionHandler, ComponentInteractionType, ComponentInteractionHandler, ModalInteractionType, ModalInteractionHandler, AutoCompleteInteractionType, DualModalSubmitInteraction } from './lib/types'
import HelloComponent from './components/hello'
import HelloModal from './modals/hello'
import HelloComplete from './autocompletes/hello'
import HelloCommand from './commands/hello'
import { APIApplicationCommandInteraction, APIInteractionResponse, APIMessageComponentInteraction, InteractionResponseType, MessageFlags } from 'discord-api-types/v10'

/**
 * If the interaction message is a command, check the command name created in REGISTERED_COMMANDS.
 */
export const REGISTERED_COMMANDS: Array<CommandInteractionType> = [
    new HelloCommand()
]
/**
 * If not found, skip to the FALLBACK_COMMANDS function.
 */
export const FALLBACK_COMMANDS: CommandInteractionHandler = async (interaction: APIApplicationCommandInteraction) => {
    return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: "Unknown Interaction",
            flags: MessageFlags.Ephemeral
        }
    } as APIInteractionResponse
}


/**
 * If the interaction message is a auto-complete of command, check the command created in REGISTERED_AUTO_COMPLETE.
 */
export const REGISTERED_AUTO_COMPLETE: Array<AutoCompleteInteractionType> = [
    new HelloComplete()
]


/**
 * If the interaction message is from components, check the custom_ids created in REGISTERED_COMPONENT_INTERACTIONS.
 */
export const REGISTERED_COMPONENT_INTERACTIONS: Array<ComponentInteractionType> = [
    new HelloComponent()
]
/**
 * If not found, skip to the FALLBACK_COMPONENT_INTERACTIONS function.
 */
export const FALLBACK_COMPONENT_INTERACTIONS: ComponentInteractionHandler = async (interaction: APIMessageComponentInteraction) => {
    return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: "Unknown Interaction",
            flags: MessageFlags.Ephemeral
        }
    } as APIInteractionResponse
}


/**
 * If the interaction message is from modals, check the custom_ids created in REGISTERED_MODAL_INTERACTIONS.
 */
export const REGISTERED_MODAL_INTERACTIONS: Array<ModalInteractionType> = [
    new HelloModal()
]
/**
 * If not found, skip to the FALLBACK_MODAL_INTERACTIONS function.
 */
export const FALLBACK_MODAL_INTERACTIONS: ModalInteractionHandler = async (interaction: DualModalSubmitInteraction) => {
    return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: "Unknown Interaction",
            flags: MessageFlags.Ephemeral
        }
    } as APIInteractionResponse
} 
