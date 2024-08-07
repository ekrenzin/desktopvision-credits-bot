import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../responseTypes.js';

/**
 * Sends credits to a user.
 * @async
 * @param {Object} interaction - Discord interaction.
 * @param {Object} env - Environment variables.
 * @returns {Object} A JSON response.
 */
async function sendCredits(interaction, env) {
  // Get the user ID from the interaction
  const userId = interaction.member.user.id;
  const toId = interaction.data.options[0].value
  const amount = interaction.data.options[1].value
  // Formulate API request
  // const localUrl = 'http://127.0.0.1:8081/desktop-vision/us-central1/handleAPI/api/credits/register';
  const url = 'https://desktop.vision/api/credits/send';
  const key = env.DV_KEY;
  const requestBody = JSON.stringify({ discord_uid: userId, amount: amount, to: toId });

  // Execute POST request
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
    },
    method: 'POST',
    body: requestBody,
  });

  // Parse response
  const body = await response.json();

  if (response.status === 400 || response.status === 404) {
    const errorEmbed = {
      title: 'Error!',
      description:
        'There was a error running this command. Please try again. If not, please contact support.',
      color: 0xff0000,
    };

    return new JsonResponse({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { embeds: [errorEmbed] },
    });
  }
  // Send a DM to the user
  return new JsonResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: body.message,
    },
  });
}

export { sendCredits };
