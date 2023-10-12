import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../responseTypes.js';

async function farmCredits(interaction, env, type = "hourly") {
  const options = interaction.data.options;
  const local_url = "http://127.0.0.1:8081/desktop-vision/us-central1/handleAPI/api/credits";
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

  const embed = {
    title: 'Credit Farming Response',
    description: body.message,
    color: 0x0099ff, // You can customize the color
  };

  const jsonResponseData = {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { embeds: [embed] },
  };

  return new JsonResponse(jsonResponseData);
}

export { farmCredits };
