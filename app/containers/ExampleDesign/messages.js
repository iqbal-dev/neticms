/*
 * ExampleDesign Messages
 *
 * This contains all the text for the ExampleDesign container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ExampleDesign';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ExampleDesign container!',
  },
});
