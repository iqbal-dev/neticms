/**
 *
 * Asynchronously loads the component for OngoingComponent
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
