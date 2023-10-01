import {
  InteractionResponseType,
} from 'discord-interactions';
import { JsonResponse } from '../responseTypes.js';

async function farmCredits(interaction, env) {
  const options = interaction.data.options;

  //send post req to dv api
  const local_url = "http://127.0.0.1:8081/desktop-vision/us-central1/handleAPI/api/credits"
  const url = 'https://desktop.vision/api/credits';
  const key = env.DV_KEY;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
    },
    method: 'POST',
    body: JSON.stringify({ discord_uid: interaction.member.user.id }),
  });
  const body = await response.json();
  
  // Determine current time in PST
  const currentPSTTime = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const hour = currentPSTTime.getHours();
  
  // Conditionally set flags
  const flags = (hour >= 9 && hour < 17) ? null : 64;

  const jsonResponseData = {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { content: body.message }
  };
  
  if (flags !== null) {
    jsonResponseData.data.flags = flags;
  }

  return new JsonResponse(jsonResponseData);
}

//https://desktopvision-credits.eankrenzin.workers.dev

export { farmCredits };