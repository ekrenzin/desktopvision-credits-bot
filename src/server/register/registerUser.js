import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../responseTypes.js';

/**
 * Registers a user and sends a private message.
 * @async
 * @param {Object} interaction - Discord interaction.
 * @param {Object} env - Environment variables.
 * @returns {Object} A JSON response.
 */
async function registerUser(interaction, env) {
  // Get the user ID from the interaction
  const userId = interaction.member.user.id;

  // Formulate API request
  // const localUrl = 'http://127.0.0.1:8081/desktop-vision/us-central1/handleAPI/api/credits/register';
  const url = 'https://desktop.vision/api/credits/register';
  const key = env.DV_KEY;
  const requestBody = JSON.stringify({ discord_uid: userId });

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

  // Send a DM to the user
  return new JsonResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: body.message,
      flags: 64, // Ephemeral flag
    },
  });
}

export { registerUser };
