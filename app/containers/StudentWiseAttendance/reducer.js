/*
 *
 * StudentWiseAttendance reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_STUDENT_ID, SET_ATTENDANCE_FROM_DATE, SET_ATTENDANCE_TO_DATE } from './constants';

export const initialState = fromJS({
  studentID: '',
  attendanceFromDate: '',
  attendanceToDate: ''
});

function studentWiseAttendanceReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_STUDENT_ID:
      return state.set('studentID', action.studentID);

    case SET_ATTENDANCE_FROM_DATE:
      return state.set('attendanceFromDate', action.attendanceFromDate);

    case SET_ATTENDANCE_TO_DATE:
      return state.set('attendanceToDate', action.attendanceToDate);

    default:
      return state;
  }
}

export default studentWiseAttendanceReducer;
