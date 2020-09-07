import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the eventGallery state domain
 */

const selectEventGalleryDomain = state =>
  state.get('eventGallery', initialState);

/**
 * Other specific selectors
 */

const makeSelectModalVisiableStatus = () =>
  createSelector(selectEventGalleryDomain, substate =>
    substate.get('modalVisiable'),
);

const makeSelectGalleryImageList = () =>
  createSelector(selectEventGalleryDomain, substate =>
    substate.get('galleryImageList'),
);

const makeSelectGalleryImageLoader = () =>
  createSelector(selectEventGalleryDomain, substate =>
    substate.get('galleryImageLoader'),
);

// makeSelectGalleryImageLoader

/**
 * Default selector used by EventGallery
 */

const makeSelectEventGallery = () =>
  createSelector(selectEventGalleryDomain, substate => substate.toJS());

export default makeSelectEventGallery;
export { 
  selectEventGalleryDomain, 
  makeSelectModalVisiableStatus, 
  makeSelectGalleryImageList,
  makeSelectGalleryImageLoader
};
