/*
 *
 * GalleryImage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, 
         ADD_MODAL_STATUS, 
         LIST_MODAL_STATUS, 
         ADD_SERIAL_NUMBER, 
         ADD_GALLERY_TITLE, 
         IMAGE_GALLERY_DETAILS,
         IMAGE_GALLERY_FILE_UPLOAD
        } from './constants';

export const initialState = fromJS({
  modalStatus : false,
  listModalStatus : false,
  serialNumber: "",
  galleryTitle: "",
  imageGalleryDetails:"",
  imageGalleryFile:""
});

function galleryImageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_MODAL_STATUS:
      const status = state.get("modalStatus");
      return state.set("modalStatus", !status)
    case LIST_MODAL_STATUS:
        const listStatus = state.get("listModalStatus");
        return state.set("listModalStatus", !listStatus)
    case ADD_SERIAL_NUMBER:       
      return state.set("serialNumber", action.serialNumber);
    case ADD_GALLERY_TITLE:
      return state.set("galleryTitle", action.galleryTitle);
    case  IMAGE_GALLERY_DETAILS:
      return state.set("imageGalleryDetails", action.imageGalleryDetails);
    case  IMAGE_GALLERY_FILE_UPLOAD:
        return state.set("imageGalleryFile", action.imageGalleryFile)
    default:
      return state;
  }
}

export default galleryImageReducer;
