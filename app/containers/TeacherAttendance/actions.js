/*
 *
 * TeacherAttendance actions
 *
 */

import { DEFAULT_ACTION, SET_ATTENDANCE_DATE, SUBMIT_SEARCH_BUTTON, SET_TEACHER_ATTENDANCE_LIST } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setAttendanceDate(attendanceDate) {
  return {
    type: SET_ATTENDANCE_DATE,
    attendanceDate
  };
}

export function submitSearchButton() {
  return {
    type: SUBMIT_SEARCH_BUTTON,
  };
}

export function setTeacherAttendanceList(attendanceList) {
  return {
    type: SET_TEACHER_ATTENDANCE_LIST,
    attendanceList
  };
}
