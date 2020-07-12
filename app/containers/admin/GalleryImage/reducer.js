/*
 *
 * GalleryImage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, ADD_MODAL_STATUS, LIST_MODAL_STATUS } from './constants';

export const initialState = fromJS({
  modalStatus : false,
  listModalStatus : false,
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
    default:
      return state;
  }
}

export default galleryImageReducer;
