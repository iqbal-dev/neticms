/**
 *
 * Asynchronously loads the component for AppRoute
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
