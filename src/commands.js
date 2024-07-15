/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 */

export const CREDITS_COMMAND = {
  name: 'credits',
  description: `Credits keep the games running. Have some free ones on the house once per hour!`,
};

export const REGISTER_COMMAND = {
  name: 'register',
  description:
    'Register your discord account with your Desktop Vision account.',
};

export const SPIN_COMMAND = {
  name: 'spin',
  description:
    'Spin the wheel to win FREE credits! Win up to 1000 credits!',
};

export const DAILY_COMMAND = {
  name: 'daily',
  description: 'Get your daily credits! 1500 credits per day.',
};

export const BALANCE_COMMAND = {
  name: 'balance',
  description: 'Check your credit balance.',
  options: [
    {
      name: 'public',
      description: 'Display your balance publicly.',
      type: 5, // Boolean type
      required: false,
    },
  ],
};

export const PING_COMMAND = {
  name: 'ping',
  description: "Check's the latency between the host and the discord API.",
};

export const SEND_COMMAND = {
  name: 'send',
  description: 'Send credits to another user.',
  options: [
    {
      name: 'user',
      description: 'The user to send credits to.',
      type: 6, // User type
      required: true,
    },
    {
      name: 'amount',
      description: 'The amount of credits to send.',
      type: 4, // Integer type
      required: true,
    },
  ],
};