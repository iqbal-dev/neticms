/*
 *
 * MeritList actions
 *
 */

import { DEFAULT_ACTION, SET_ACADEMIC_YEAR, SUBMIT_SEARCH_BUTTON,SET_EXAM_LIST, SET_ACADEMIC_YEAR_LIST } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setAcademicYear(academicYear) {
  console.log('action academicYear',academicYear);

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

export function setExamListInfo(examList) {
  return {
    type: SET_EXAM_LIST,
    examList
  };
}

export function setAcademicYearList(academicYearList) {
  console.log('action academicYearList',academicYearList);

  return {
    type: SET_ACADEMIC_YEAR_LIST,
    academicYearList
  };
}

