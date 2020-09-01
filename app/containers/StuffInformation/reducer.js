/*
 *
 * StuffInformation reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_STAFF_INFO_LIST, SET_STUFF_INFORMATION_ROWDATA, SET_LOADER } from './constants';

export const initialState = fromJS({
  staffInfoList: [],
  stuffRowData: '',
  loaderType: '',
});

function stuffInformationReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_STAFF_INFO_LIST:
      return state.set('staffInfoList', action.staffInfoList);

    case SET_STUFF_INFORMATION_ROWDATA:
      return state.set('stuffRowData', action.rowData);

    case SET_LOADER:
      return state.set('loaderType', action.loaderType);

    default:
      return state;
  }
}

export default stuffInformationReducer;
