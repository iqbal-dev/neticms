/**
 *
 * Asynchronously loads the component for History
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
