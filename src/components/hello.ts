import { APIMessageComponentInteraction, ComponentType, InteractionResponseType, TextInputStyle } from "discord-api-types/v10";
import { ComponentInteractionHandler, ComponentInteractionType, SimpleCheckData } from "../lib/types";

export default class Hello implements ComponentInteractionType {
    data: SimpleCheckData = {
        text: "hello_click"
    }
    handle: ComponentInteractionHandler = async (interaction: APIMessageComponentInteraction) => {
        return {
            type: InteractionResponseType.Modal,
            data: {
                custom_id: "hellomodal",
                title: "Hello World! (Modal!!!)",
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.TextInput,
                                custom_id: "hello",
                                label: "Enter your name!",
                                style: TextInputStyle.Short,
                                min_length: 1,
                                max_length: 4,
                                placeholder: "owo!",
                                required: true
                            }
                        ]
                    },
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.TextInput,
                                custom_id: "hello2",
                                label: "Hello2",
                                style: TextInputStyle.Paragraph,
                                min_length: 10,
                                max_length: 40,
                                placeholder: "owo!owo!owo!owo!",
                                required: false
                            }
                        ]
                    }
                ]
            }
        }
    }
}