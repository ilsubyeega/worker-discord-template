import { ApplicationCommandType, APIApplicationCommand, APIApplicationCommandInteraction, APIMessageComponentInteraction, APIInteractionResponse, APIModalSubmitDMInteraction, APIModalSubmitGuildInteraction, APIApplicationCommandAutocompleteDMInteraction, APIApplicationCommandAutocompleteGuildInteraction, APIApplicationCommandAutocompleteResponse } from 'discord-api-types/v10'

export interface SimpleCheckData {
    text?: String
    regex?: RegExp
}

export interface FunctionalCheck<T> {
    check: (data: T) => Promise<Boolean>
}

export type CommandInteractionHandler = (interaction: APIApplicationCommandInteraction) => Promise<APIInteractionResponse>
export type CommandInteractionType = {
    data: Omit<APIApplicationCommand, "application_id" | "id" | "version">
    handle: CommandInteractionHandler
}

export type DualAutocompleteInteraction = (APIApplicationCommandAutocompleteDMInteraction | APIApplicationCommandAutocompleteGuildInteraction)
export type AutoCompleteInteractionHandler = (interaction: DualAutocompleteInteraction) => Promise<APIApplicationCommandAutocompleteResponse>
export type AutoCompleteInteractionType = {
    check: FunctionalCheck<DualAutocompleteInteraction> // TODO
    handle: AutoCompleteInteractionHandler
}

export type ComponentInteractionHandler = (interaction: APIMessageComponentInteraction) => Promise<APIInteractionResponse>
export type ComponentInteractionType = {
    data: SimpleCheckData
    handle: ComponentInteractionHandler
}

export type DualModalSubmitInteraction = (APIModalSubmitDMInteraction | APIModalSubmitGuildInteraction)
export type ModalInteractionHandler = (interaction: DualModalSubmitInteraction) => Promise<APIInteractionResponse>
export type ModalInteractionType = {
    data: SimpleCheckData
    handle: ModalInteractionHandler
}