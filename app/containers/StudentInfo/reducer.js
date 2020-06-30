/*
 *
 * StudentInfo reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, CLASS_NAME_DROPDOWN_LIST } from './constants';

export const initialState = fromJS({
  classNamesDropdown:[],
});

function studentInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CLASS_NAME_DROPDOWN_LIST:
      return state.set('classNamesDropdown', action.classNamesDropdown);
    default:
      return state;
  }
}

export default studentInfoReducer;
