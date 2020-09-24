/**
 *
 * Asynchronously loads the component for TopStudents
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
