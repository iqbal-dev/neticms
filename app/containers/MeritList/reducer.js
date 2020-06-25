/*
 *
 * MeritList reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_ACADEMIC_YEAR } from './constants';

export const initialState = fromJS({
  academicYear: ''
});

function meritListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

      case SET_ACADEMIC_YEAR:
      return state.set('academicYear', action.academicYear);
    default:
      return state;
  }
}

export default meritListReducer;
