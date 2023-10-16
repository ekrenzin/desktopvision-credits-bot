import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../responseTypes.js';

async function farmCredits(interaction, env, type = 'hourly') {
  if (interaction.channel_type === 1) {
    const dmResponse = {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Hello! To use this command please go to <#1162140966405284021>. If you haven't already, please make sure to link your Discord to your Desktop Vision account using /register.`,
      },
    };

    return new JsonResponse(dmResponse);
  }

  const options = interaction.data.options;
  const local_url =
    'http://127.0.0.1:8081/desktop-vision/us-central1/handleAPI/api/credits';
  const url = 'https://desktop.vision/api/credits';
  const key = env.DV_KEY;

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

  if (!body.credits || body.credits <= 100) {
    jsonResponseData.data.flags = 64;
  }

  return new JsonResponse(jsonResponseData);
}

export { farmCredits };
