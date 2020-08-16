/*
 *
 * SeatInfo reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_SEAT_INFO_LIST, SET_LOADER } from './constants';

export const initialState = fromJS({
  seatInfoList: [],
  loaderType: '',
});

function seatInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_SEAT_INFO_LIST:
      return state.set('seatInfoList', action.seatInfoList);

    case SET_LOADER:
      return state.set('loaderType', action.loaderType);

    default:
      return state;
  }
}

export default seatInfoReducer;
