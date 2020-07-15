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

  const makeSelectListModalStatus = () =>
  createSelector(selectGalleryImageDomain, substate => 
    substate.get('listModalStatus'),  
  );

  const makeSelectAddSerialNumber = () =>
  createSelector(selectGalleryImageDomain, substate => 
    substate.get('serialNumber'),  
  );

  const makeSelectAddGalleryTitle = () =>
  createSelector(selectGalleryImageDomain, substate => 
    substate.get('galleryTitle'),  
  );

  const makeGalleryImageDetails = () =>
  createSelector(selectGalleryImageDomain, substate => 
    substate.get('imageGalleryDetails'),  
  );

  const makeGalleryImageFileUpload = () =>
  createSelector(selectGalleryImageDomain, substate => 
    substate.get('imageGalleryFile'),  
  );

/**
 * Default selector used by GalleryImage
 */

const makeSelectGalleryImage = () =>
  createSelector(selectGalleryImageDomain, substate => substate.toJS());

export default makeSelectGalleryImage;
export { selectGalleryImageDomain, makeSelectModalStatus, makeSelectListModalStatus, makeSelectAddSerialNumber, makeSelectAddGalleryTitle, makeGalleryImageDetails, makeGalleryImageFileUpload};
