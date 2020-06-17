/*
 * BookList Messages
 *
 * This contains all the text for the BookList container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.BookList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the BookList container!',
  },
});
