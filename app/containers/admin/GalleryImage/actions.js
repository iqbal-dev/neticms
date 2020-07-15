/*
 *
 * GalleryImage actions
 *
 */

import { DEFAULT_ACTION, 
         ADD_MODAL_STATUS, 
         LIST_MODAL_STATUS, 
         ADD_SERIAL_NUMBER, 
         ADD_GALLERY_TITLE, 
         IMAGE_GALLERY_DETAILS,
         IMAGE_GALLERY_FILE_UPLOAD } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function setModalStatus() {
  return {
    type: ADD_MODAL_STATUS,
  };
}
export function setListModalStatus() {
  return {
    type: LIST_MODAL_STATUS,
  };
}

export function setSerialNumber(serialNumber) {
  return {
    type: ADD_SERIAL_NUMBER,
    serialNumber
  };
}

export function setGalleyImageTitle(galleryTitle) {
  return {
    type: ADD_GALLERY_TITLE,
    galleryTitle
  };
}

export function setGalleyImageDetails(imageGalleryDetails) {
  return {
    type: IMAGE_GALLERY_DETAILS,
    imageGalleryDetails
  };
}
export function setGalleyImageFile(imageGalleryFile) {
  return {
    type: IMAGE_GALLERY_DETAILS,
    imageGalleryFile
  };
}

