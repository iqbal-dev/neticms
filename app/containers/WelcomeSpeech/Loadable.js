/**
 *
 * Asynchronously loads the component for WelcomeSpeech
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
