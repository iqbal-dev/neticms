/*
 * AppHeader Messages
 *
 * This contains all the text for the AppHeader container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AppHeader';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the AppHeader container!',
  },
});
