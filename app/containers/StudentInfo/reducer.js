/*
 *
 * StudentInfo reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, CLASS_NAME_DROPDOWN_LIST, CLASS_NAME_SELECTED } from './constants';

export const initialState = fromJS({
  classNamesDropdown:[],
  classNameSelected:""
});

function studentInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CLASS_NAME_DROPDOWN_LIST:
      return state.set('classNamesDropdown', action.classNamesDropdown);
      case CLASS_NAME_SELECTED:
        return state.set('classNameSelected', action.classNameSelected);
    default:
      return state;
  }
}

export default studentInfoReducer;
