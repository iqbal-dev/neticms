/*
 *
 * StudentWiseAttendance reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_STUDENT_ID, SET_ATTENDANCE_FROM_DATE, SET_ATTENDANCE_TO_DATE, SET_ATTENDANCE_LIST } from './constants';

export const initialState = fromJS({
  studentID: '',
  attendanceFromDate: '',
  attendanceToDate: '',
  attendanceList: [],
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

    case SET_ATTENDANCE_LIST:
      return state.set('attendanceList', action.list);

    default:
      return state;
  }
}

export default studentWiseAttendanceReducer;
