import { APIApplicationCommandAutocompleteResponse, APIApplicationCommandInteractionDataStringOption, InteractionResponseType } from "discord-api-types/v10";
import { AutoCompleteInteractionHandler, AutoCompleteInteractionType, DualAutocompleteInteraction, FunctionalCheck } from "../lib/types";

export default class Hello implements AutoCompleteInteractionType {
    check: FunctionalCheck<DualAutocompleteInteraction> = {
        check: async (data: DualAutocompleteInteraction) => {
            return data.data.name === "hello"
        }
    }
    handle: AutoCompleteInteractionHandler = async (interaction: DualAutocompleteInteraction) => {
        const result = {
            type: InteractionResponseType.ApplicationCommandAutocompleteResult,
            data: {
                choices: [{
                    name: `The current time on this instance is ${new Date()}`,
                    value: `${new Date().getUTCMilliseconds}`
                },
                {
                    name: 'Powered by ilsubyeega (worker-discord-template)',
                    value: 'https://github.com/ilsubyeega/worker-discord-template'
                },
                {
                    name: `You entered this: ${((interaction.data.options[0]) as APIApplicationCommandInteractionDataStringOption).value}`,
                    value: 'you_entered_this',
                    focused: true
                }]
            }
        } as APIApplicationCommandAutocompleteResponse
        return result
    };

}