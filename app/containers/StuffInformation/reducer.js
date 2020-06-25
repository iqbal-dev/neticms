/*
 *
 * StuffInformation reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_STAFF_INFO_LIST, SET_STUFF_INFORMATION_ROWDATA  } from './constants';

export const initialState = fromJS({
  staffInfoList: [],
  stuffRowData: ''
});

function stuffInformationReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

      case SET_STAFF_INFO_LIST:
        return state.set('staffInfoList', action.staffInfoList);

        case SET_STUFF_INFORMATION_ROWDATA:
          return state.set('stuffRowData', action.rowData);

    default:
      return state;
  }
}

export default stuffInformationReducer;
