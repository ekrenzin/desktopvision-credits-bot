/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 */

export const CREDITS_COMMAND = {
  name: 'credits',
  description: `Credits keep the games running. Have some free ones on the house once per hour! 50-1500 credits can be won!`,
  options: [
    {
      name: 'email',
      description: 'Your email address.',
      type: 3, // 3 is string
      required: true,
    },
  ],
};
