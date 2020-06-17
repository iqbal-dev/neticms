/**
 *
 * Asynchronously loads the component for BookList
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
