/*
 *
 * StuffInformation reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_STAFF_INFO_LIST } from './constants';

export const initialState = fromJS({
  staffInfoList: [],
});

function stuffInformationReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

      case SET_STAFF_INFO_LIST:
        return state.set('staffInfoList', action.staffInfoList);

    default:
      return state;
  }
}

export default stuffInformationReducer;
