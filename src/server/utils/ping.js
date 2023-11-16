import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../responseTypes.js';

/**
 * Responds with the latency between the bot and the Discord API.
 * @async
 * @param {Object} env - Enviroment params used to send token to discord's API.
 * @returns {Object} A JSON response.
 */
async function ping(env) {
  const token = env.DISCORD_TOKEN;

  const startTime = Date.now();

  await fetch('https://discord.com/api/v10', {
    method: 'GET',
    headers: {
      Authorization: `Bot ${token}`,
    },
  });

  const endTime = Date.now();
  const latency = endTime - startTime;

  const finalEmbed = {
    title: 'Pong!',
    description: `API Latency is ${latency}ms.`,
    color: 0x0099ff,
  };

  return new JsonResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [finalEmbed],
    },
  });
}

export { ping };
