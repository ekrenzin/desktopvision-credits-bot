import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../responseTypes.js';
import fetch from 'node-fetch';

const REMOTE_URL = 'https://desktop.vision/api/credits/spin';

async function spinCredits(interaction, env) {
  const { DV_KEY } = env;
  const {
    member: {
      user: { id },
    },
  } = interaction;

  const response = await fetch(REMOTE_URL, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': DV_KEY,
    },
    method: 'POST',
    body: JSON.stringify({ discord_uid: id }),
  });

  const body = await response.json();

  if (body.credits === 0) {
    const jsonResponseData = {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: 'You have no credits.' },
      flags: 64,
    };

    return new JsonResponse(jsonResponseData);
  }

  if (response.status !== 400 || 404) {
    const errorEmbed = {
      title: "Error!",
      description: body.message || "There was a error running this command. Please try again. If not, please contact support.",
      color: 0xff0000,
    };
  
    return new JsonResponse({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { embeds: [errorEmbed] },
    });
  }

  const finalEmbed = {
    title:
      body.title ||
      '<a:dvspin:1086082214472724602> Desktop Vision Credits <a:dvspin:1086082214472724602>',
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

export { spinCredits };
