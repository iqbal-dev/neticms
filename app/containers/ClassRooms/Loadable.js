/**
 *
 * Asynchronously loads the component for ClassRooms
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
