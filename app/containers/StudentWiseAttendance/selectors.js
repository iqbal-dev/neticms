import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the studentWiseAttendance state domain
 */

const selectStudentWiseAttendanceDomain = state =>
  state.get('studentWiseAttendance', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudentWiseAttendance
 */

const makeSelectStudentWiseAttendance = () =>
  createSelector(selectStudentWiseAttendanceDomain, substate =>
    substate.toJS(),
  );

export default makeSelectStudentWiseAttendance;
export { selectStudentWiseAttendanceDomain };
