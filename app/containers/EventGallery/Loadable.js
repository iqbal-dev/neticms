/**
 *
 * Asynchronously loads the component for EventGallery
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
