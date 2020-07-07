/*
 *
 * AdminFeesInfo reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, GET_FEES_INFO_LIST } from './constants';

export const initialState = fromJS({
  feesInfoList: []
});

function adminFeesInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

      case GET_FEES_INFO_LIST:
        return state.set('feesInfoList', action.feesInfoList);
    default:
      return state;
  }
}

export default adminFeesInfoReducer;
