/*
 *
 * GalleryImage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, ADD_MODAL_STATUS } from './constants';

export const initialState = fromJS({
  modalStatus : false
});

function galleryImageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_MODAL_STATUS:
      const status = state.get("modalStatus");
      return state.set("modalStatus", !status)
    default:
      return state;
  }
}

export default galleryImageReducer;
