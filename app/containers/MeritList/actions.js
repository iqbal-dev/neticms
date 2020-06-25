/*
 *
 * MeritList actions
 *
 */

import { DEFAULT_ACTION, SET_ACADEMIC_YEAR, SUBMIT_SEARCH_BUTTON } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setAcademicYear(academicYear) {
  return {
    type: SET_ACADEMIC_YEAR,
    academicYear
  };
}

export function submitSearchButton() {
  return {
    type: SUBMIT_SEARCH_BUTTON,
  };
}
