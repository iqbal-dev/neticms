/*
 * WelcomeSpeech Messages
 *
 * This contains all the text for the WelcomeSpeech container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.WelcomeSpeech';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the WelcomeSpeech container!',
  },
});
