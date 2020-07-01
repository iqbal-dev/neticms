/*
 *
 * SectionWiseAttendance actions
 *
 */

import { DEFAULT_ACTION, SET_ON_CHANGE_DATE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function makeChangeDate(date) {

  console.log("ACTION date", date);
  
  return {
    type: SET_ON_CHANGE_DATE,
    date
  };
}

export function setSectionWiseAttendanceListData(attendanceListData) {
  return {
    type: SET_SECTION_WISE_ATTENDANCE_LIST_DATA,
    attendanceListData,
  };
}
