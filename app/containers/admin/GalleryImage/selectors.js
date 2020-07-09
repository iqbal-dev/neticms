import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the galleryImage state domain
 */

const selectGalleryImageDomain = state =>
  state.get('galleryImage', initialState);

/**
 * Other specific selectors
 */
const makeSelectModalStatus = () =>
  createSelector(selectGalleryImageDomain, substate => 
    substate.get('modalStatus'),  
  );

/**
 * Default selector used by GalleryImage
 */

const makeSelectGalleryImage = () =>
  createSelector(selectGalleryImageDomain, substate => substate.toJS());

export default makeSelectGalleryImage;
export { selectGalleryImageDomain, makeSelectModalStatus };
