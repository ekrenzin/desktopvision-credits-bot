import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../responseTypes.js';

async function farmCredits(interaction, env, type = 'hourly') {
  // Check if the interaction is in a DM (direct message)
  if (interaction.channel_type === 1) {
    const dmResponse = {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Hello! To use this command please go to <#1162140966405284021>. If you haven't already, please make sure to link your Discord to your Desktop Vision account using /register.`,
      },
    };

    return new JsonResponse(dmResponse);
  }

  const { DV_KEY } = env;
  const url = 'https://desktop.vision/api/credits';
  const key = DV_KEY;

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
