/*
 *
 * EventGallery actions
 *
 */

import { DEFAULT_ACTION, SET_MODAL_STATUS, EVENT_GALLERY_IMAGE_LIST, SET_GALLERY_IMAGE_LOADER } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setModalVisiableStatus() {
  return {
    type: SET_MODAL_STATUS,
  };
}

export function fetchGalleryImageList(galleryImageList){
  return{
    type: EVENT_GALLERY_IMAGE_LIST,
    galleryImageList
  }
}

export function setGalleryImageLoader(galleryImageLoader) {
  return {
    type: SET_GALLERY_IMAGE_LOADER,
    galleryImageLoader,
  };
}
