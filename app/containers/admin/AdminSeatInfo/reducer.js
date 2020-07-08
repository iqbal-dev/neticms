/*
 *
 * AdminSeatInfo reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  DEFAULT_ACTION, 
  
  GET_GROUP_LIST, 
  GET_CLASS_LIST,
  GET_SEAT_INFO_LIST, 
} from './constants';

export const initialState = fromJS({
  seatInfoList: []
});

function adminSeatInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_CLASS_LIST:
      return state.set('classList', action.classList);

    case GET_GROUP_LIST:
      return state.set('groupList', action.groupList);

    case GET_SEAT_INFO_LIST:
        return state.set('seatInfoList', action.seatInfoList);

    default:
      return state;
  }
}

export default adminSeatInfoReducer;
