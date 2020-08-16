/*
 *
 * FeesInfo reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_CLASS_LIST, SET_ON_CHANGE_CLASS_VALUE, SET_FEES_INFO_LIST, SET_LOADER } from './constants';

export const initialState = fromJS({
  classValue: '',
  classList: [],
  feesInfoList: []
});

function feesInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_CLASS_LIST:
      return state.set('classList', action.classList);
    case SET_FEES_INFO_LIST:
      return state.set('feesInfoList', action.feesInfoList);
    case SET_ON_CHANGE_CLASS_VALUE:
      return state.set('classValue', action.classValue);

    case SET_LOADER:
      return state.set('loaderType', action.loaderType);

    default:
      return state;
  }
}

export default feesInfoReducer;
