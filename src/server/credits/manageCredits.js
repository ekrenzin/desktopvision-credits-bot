import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../responseTypes.js';
import fetch from 'node-fetch';

async function manageCredits(interaction, env, type = 'balance') {
    //const options = interaction.data.options;
    // const local_url = 'http://127.0.0.1:8081/desktop-vision/us-central1/handleAPI/api/credits';
    const url = 'https://desktop.vision/api/credits';
    const key = env.DV_KEY;

    if (!interaction || !interaction.member || !interaction.member.user) {
        return new JsonResponse({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: 'You must be logged in to use this command.' },
        });
    }
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': key,
        },
        method: 'POST',
        body: JSON.stringify({ discord_uid: interaction.member.user.id, type }),
    });

    const body = await response.json();

    const finalEmbed = {
        description: body.message,
        color: 0x0099ff,
        footer: {
            text: 'Want more play time? Visit https://desktop.vision/app/#/shop',
        },
    };

    const jsonResponseData = {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { embeds: [finalEmbed] },
    };

    //if the interaction has public set to true, then we want to send the message to the channel
    if (!interaction.data.options[0].value) {
        jsonResponseData.data.flags = 64;
    }

    return new JsonResponse(jsonResponseData);
}

export { manageCredits as farmCredits };
