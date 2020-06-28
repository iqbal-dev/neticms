/*
 *
 * FailList reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  DEFAULT_ACTION, 
  SET_ON_CHANGE_ACADEMIC_YEAR, 
  SET_ON_CHANGE_SECTION, 
  SET_ON_CHANGE_EXAM_TYPE,
  SET_FAIL_LIST_DATA
} from './constants';

export const initialState = fromJS({
  failListData: []
});

function failListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_ON_CHANGE_ACADEMIC_YEAR:
      return state.set('changeAcademicYear', action.changeAcademicYear);

    case SET_ON_CHANGE_SECTION:
      return state.set('changeSection', action.changeSection);

    case SET_ON_CHANGE_EXAM_TYPE:
      return state.set('changeSection', action.changeSection);

    case SET_FAIL_LIST_DATA:
      return state.set('failListData', action.failListData);

    default:
      return state;
  }
}

export default failListReducer;
