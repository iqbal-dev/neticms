/*
 *
 * MeritList reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_ACADEMIC_YEAR, SET_EXAM_LIST } from './constants';

export const initialState = fromJS({
  academicYear: '',
  examList: '',
  academicYearList: ''
});

function meritListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

      case SET_ACADEMIC_YEAR:
      return state.set('academicYear', action.academicYear);

      case SET_EXAM_LIST:
      return state.set('examList', action.examList);

      case SET_ACADEMIC_YEAR_LIST:
        return state.set('academicYearList', action.academicYearList);

    default:
      return state;
  }
}

export default meritListReducer;
