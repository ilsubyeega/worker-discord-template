import { APIApplicationCommand, APIApplicationCommandInteraction, APIInteractionResponse, ApplicationCommandType, InteractionResponseType, APIApplicationCommandOption, APIApplicationCommandStringOption, ComponentType, ButtonStyle, ApplicationCommandOptionType, APIChatInputApplicationCommandInteraction, APIApplicationCommandInteractionDataStringOption } from "discord-api-types/v10";
import { CommandInteractionHandler, CommandInteractionType } from "../lib/types";

export default class Hello implements CommandInteractionType {
    data: Omit<APIApplicationCommand, "application_id" | "id" | "version"> = {
        type: ApplicationCommandType.ChatInput,
        name: "hello",
        description: "Hello!",
        default_member_permissions: null,
        dm_permission: false,
        options: [
            {
                name: "owo",
                description: "owo_desc",
                type: ApplicationCommandOptionType.String,
                required: false,
                autocomplete: true
            }
        ]
    }
    handle: CommandInteractionHandler = async (interaction: APIApplicationCommandInteraction) => {
        interaction = interaction as APIChatInputApplicationCommandInteraction
        const arg = (interaction.data.options?.[0] as APIApplicationCommandInteractionDataStringOption)?.value
        if (arg != null) {
            return {
                type: InteractionResponseType.ChannelMessageWithSource,
                data: {
                    embeds: [
                        {
                            description: `You inputted this: **${arg}**`,
                            footer: {
                                text: "Do /help for getting button component which opens the modal!"
                            },
                            timestamp: (new Date()).toISOString()
                        }
                    ]
                }
            }
        }

        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "Hello!",
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.Button,
                                label: "Open Modal",
                                style: ButtonStyle.Primary,
                                custom_id: "hello_click"
                            }
                        ]
                    }
                ]
            }
        }
    }
}