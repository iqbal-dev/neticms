/*
 *
 * StudentInfo reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, CLASS_NAME_LIST } from './constants';

export const initialState = fromJS({
  classNameList: [],
});

function studentInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CLASS_NAME_LIST:
      return state.set('classNameList', action.classNameList);
    default:
      return state;
  }
}

export default studentInfoReducer;
