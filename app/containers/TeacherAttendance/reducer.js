/*
 *
 * TeacherAttendance reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION,SET_ATTENDANCE_DATE, SET_TEACHER_ATTENDANCE_LIST } from './constants';

export const initialState = fromJS({
  attendanceDate: '',
  attendanceList: []
});

function teacherAttendanceReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_ATTENDANCE_DATE:
      return state.set('attendanceDate', action.attendanceDate);

      case SET_TEACHER_ATTENDANCE_LIST:
        return state.set('attendanceList', action.attendanceList);

    default:
      return state;
  }
}

export default teacherAttendanceReducer;
