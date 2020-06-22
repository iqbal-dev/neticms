import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the teacherAttendance state domain
 */

const selectTeacherAttendanceDomain = state =>
  state.get('teacherAttendance', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TeacherAttendance
 */

const makeSelectTeacherAttendance = () =>
  createSelector(selectTeacherAttendanceDomain, substate => substate.toJS());

export default makeSelectTeacherAttendance;
export { selectTeacherAttendanceDomain };
