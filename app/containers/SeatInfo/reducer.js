/*
 *
 * SeatInfo reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_SEAT_INFO_LIST } from './constants';

export const initialState = fromJS({
  seatInfoList: []
});

function seatInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
      case SET_SEAT_INFO_LIST:
        return state.set('seatInfoList', action.seatInfoList);
    default:
      return state;
  }
}

export default seatInfoReducer;
