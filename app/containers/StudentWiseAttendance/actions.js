/*
 *
 * StudentWiseAttendance actions
 *
 */

import {
  DEFAULT_ACTION, SET_STUDENT_ID, SET_ATTENDANCE_FROM_DATE, SET_ATTENDANCE_TO_DATE, SUBMIT_SEARCH_BUTTON,
  SET_ATTENDANCE_LIST, SET_LOADER
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setStudentID(studentID) {
  return {
    type: SET_STUDENT_ID,
    studentID
  };
}

export function setAttendanceFromDate(attendanceFromDate) {
  return {
    type: SET_ATTENDANCE_FROM_DATE,
    attendanceFromDate
  };
}

export function setAttendanceToDate(attendanceToDate) {
  return {
    type: SET_ATTENDANCE_TO_DATE,
    attendanceToDate
  };
}

export function submitSearchButton() {
  return {
    type: SUBMIT_SEARCH_BUTTON,
  };
}

export function setAttendanceList(list) {
  return {
    type: SET_ATTENDANCE_LIST, list
  };
}

export function setLoader(loaderType) {
  return { type: SET_LOADER, loaderType, };
}
