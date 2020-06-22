/**
 *
 * Asynchronously loads the component for StudentInfo
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
