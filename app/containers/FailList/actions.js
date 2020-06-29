/*
 *
 * FailList actions
 *
 */

import { 
  DEFAULT_ACTION, 
  SET_ACADEMIC_YEAR_LIST,
  SET_SECTION_LIST,
  SET_EXAM_LIST,
  SET_ON_CHANGE_ACADEMIC_YEAR, 
  SET_ON_CHANGE_SECTION,
  SET_ON_CHANGE_EXAM_TYPE,
  SET_FAIL_LIST_DATA,
  SUBMIT_SEARCH_BUTTON
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setAcademicYearList(yearList) {
  return {
    type: SET_ACADEMIC_YEAR_LIST,
    yearList,
  };
}

export function setSectionList(sectionList) {
  return {
    type: SET_SECTION_LIST,
    sectionList,
  };
}

export function setExamList(examList) {
  return {
    type: SET_EXAM_LIST,
    examList,
  };
}

export function makeChangeAcademicYear(acYear) {
  return {
    type: SET_ON_CHANGE_ACADEMIC_YEAR,
    acYear
  };
}

export function makeChangeSection(classConfigId) {
  return {
    type: SET_ON_CHANGE_SECTION,
    classConfigId
  };
}

export function makeChangeExamType(examConfigId) {
  return {
    type: SET_ON_CHANGE_EXAM_TYPE,
    examConfigId
  };
}

export function submitSearchHandle() {
  return {
    type: SUBMIT_SEARCH_BUTTON,
  };
}

export function setFailListData(failListData) {
  return {
    type: SET_FAIL_LIST_DATA,
    failListData,
  };
}
