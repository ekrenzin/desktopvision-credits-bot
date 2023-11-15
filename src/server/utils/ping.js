import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../responseTypes.js';
import dotenv from 'dotenv';

/**
 * Responds with the latency between the bot and the Discord API.
 * @async
 * @param {Object} interaction - Discord interaction.
 * @returns {Object} A JSON response.
 */
async function ping(interaction) {
  dotenv.config({ path: '.dev.vars' });
  const token = process.env.DISCORD_TEST_TOKEN;
  const startTime = Date.now();
  
  const response = await fetch('https://discord.com/api/v10/gateway/bot', {
    method: 'GET',
  });

  const endTime = Date.now();
  const latency = endTime - startTime;

  return new JsonResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Pong! Latency is ${latency}ms.`,
    },
  });

  const finalEmbed = {
    title: 'Pong!',
    description: `API Latency is ${latency}ms.`,
    color: 0x0099ff,
  };
}

export { ping };