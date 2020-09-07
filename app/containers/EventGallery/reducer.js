/*
 *
 * EventGallery reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_MODAL_STATUS, EVENT_GALLERY_IMAGE_LIST, SET_GALLERY_IMAGE_LOADER } from './constants';

export const initialState = fromJS({
  modalVisiable: false,
  galleryImageList: [],
  galleryImageLoader: true
});

function eventGalleryReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_MODAL_STATUS:
      const status = state.get('modalVisiable');
      return state.set('modalVisiable', !status);
    case EVENT_GALLERY_IMAGE_LIST:
      return state.set('galleryImageList', action.galleryImageList)

    case SET_GALLERY_IMAGE_LOADER:
      return state.set('galleryImageLoader', action.galleryImageLoader)

    default:
      return state;
  }
}

export default eventGalleryReducer;
