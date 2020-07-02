/*
 *
 * FindPayslip actions
 *
 */

import { 
  DEFAULT_ACTION, 
  SET_PANEL_TAB_STATUS, 
  SET_ON_CHANGE_ACADEMIC_YEAR, 
  SET_ACADEMIC_YEAR_LIST,
  SET_ON_CHANGE_STUDENT_ID, 
  SUBMIT_SEARCH_BUTTON,
  SET_PAY_SLIP_LIST_DATA
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setActivePanel(activeId) {  
  return {
    type: SET_PANEL_TAB_STATUS,
    activeId
  };
}

export function setAcademicYearList(yearList) {
  return {
    type: SET_ACADEMIC_YEAR_LIST,
    yearList,
  };
}

export function makeChangeAcademicYear(acYear) {
  return {
    type: SET_ON_CHANGE_ACADEMIC_YEAR,
    acYear
  };
}

export function makeChangeStudentID(stdID) {
  return {
    type: SET_ON_CHANGE_STUDENT_ID,
    stdID
  };
}

export function submitSearchHandle() {
  return {
    type: SUBMIT_SEARCH_BUTTON,
  };
}

export function setPaySlipListData(paySlipListData) {
  return {
    type: SET_PAY_SLIP_LIST_DATA,
    paySlipListData,
  };
}
