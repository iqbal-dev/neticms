import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the studentWiseAttendance state domain
 */

const selectStudentWiseAttendanceDomain = state =>
  state.get('studentWiseAttendance', initialState);

const makeSelectStudentID = () =>
  createSelector(selectStudentWiseAttendanceDomain, substate => substate.get('studentID'));

const makeSelectAttendanceFromDate = () =>
createSelector(selectStudentWiseAttendanceDomain, substate => substate.get('attendanceFromDate'));

const makeSelectAttendancToeDate = () =>
createSelector(selectStudentWiseAttendanceDomain, substate => substate.get('attendanceToDate'));

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
export { selectStudentWiseAttendanceDomain,
  makeSelectStudentID,
  makeSelectAttendanceFromDate,
  makeSelectAttendancToeDate
 };
