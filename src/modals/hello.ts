import { InteractionResponseType } from "discord-api-types/v10";
import { DualModalSubmitInteraction, ModalInteractionHandler, ModalInteractionType, SimpleCheckData } from "../lib/types";

export default class Hello implements ModalInteractionType {
    data: SimpleCheckData = {
        text: "hellomodal"
    }
    handle: ModalInteractionHandler = async (interaction: DualModalSubmitInteraction) => {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: `Hello, ${interaction.data.components?.[0].components?.[0].value}`
            }
        }
    };

}