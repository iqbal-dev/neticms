/*
 *
 * FindPayslip actions
 *
 */

import { DEFAULT_ACTION, SET_PANEL_TAB_STATUS, SET_ON_CHANGE_ACADEMIC_YEAR } from './constants';

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

export function makeChangeAcademicYear(acYear) {
  return {
    type: SET_ON_CHANGE_ACADEMIC_YEAR,
    acYear
  };
}
