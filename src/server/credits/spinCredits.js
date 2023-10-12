import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../responseTypes.js';

/**
 * Constants for API endpoints and other configurations
 */
//const LOCAL_URL =
('http://127.0.0.1:8081/desktop-vision/us-central1/handleAPI/api/credits');
const REMOTE_URL = 'https://desktop.vision/api/credits/spin';

/**
 * Spin credits for an interaction in a given environment
 * @param {Object} interaction - The interaction data.
 * @param {Object} env - The environment variables.
 * @returns {JsonResponse} - A JSON response object.
 */
async function spinCredits(interaction, env) {
  const { DV_KEY } = env;
  const {
    member: {
      user: { id },
    },
  } = interaction;

  // Send POST request to Desktop Vision API
  const response = await fetch(REMOTE_URL, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': DV_KEY,
    },
    method: 'POST',
    body: JSON.stringify({ discord_uid: id }),
  });

  const body = await response.json();

  const jsonResponseData = {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { content: body.message },
  };

  if (!body.credits || body.credits <= 100) {
    jsonResponseData.data.flags = 64;
  }

  return new JsonResponse(jsonResponseData);
}

//https://desktopvision-credits.eankrenzin.workers.dev

export { spinCredits };
