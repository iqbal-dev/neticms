/*
 *
 * EventGallery reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_MODAL_STATUS } from './constants';

export const initialState = fromJS({
  modalVisiable: false,
});

function eventGalleryReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_MODAL_STATUS:
      const status = state.get('modalVisiable');
      return state.set('modalVisiable', !status);
    default:
      return state;
  }
}

export default eventGalleryReducer;
