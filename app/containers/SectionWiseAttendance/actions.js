/*
 *
 * SectionWiseAttendance actions
 *
 */

import { DEFAULT_ACTION, SET_ON_CHANGE_DATE, ONSUBMIT_SEARCH, SET_ATTENDANCE_LIST, SET_CHART_DATA } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function makeChangeDate(date) {
  return {
    type: SET_ON_CHANGE_DATE,
    date
  };
}

export function onSubmitSearchBtn() {
  return { type: ONSUBMIT_SEARCH };
}

export function setSectionWiseAttendanceListData(dataList) {
  return {
    type: SET_ATTENDANCE_LIST,
    dataList,
  };
}

export function setChartDataArray(dataArray) {
  return {
    type: SET_CHART_DATA,
    dataArray,
  };
}
