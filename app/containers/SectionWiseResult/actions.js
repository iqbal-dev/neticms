/*
 *
 * SectionWiseResult actions
 *
 */

import { DEFAULT_ACTION, SET_ACADEMIC_YEAR, SUBMIT_SEARCH_BUTTON,SET_EXAM_LIST, SET_ACADEMIC_YEAR_LIST, SET_SECTION_LIST,SET_ON_CHANGE_EXAM_TYPE, SET_ON_CHANGE_SECTION, SET_SECTION_WISE_RESULT_DATA } from './constants';

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

export function setExamList(examList) {
  return {
    type: SET_EXAM_LIST,
    examList
  };
}

export function setAcademicYearList(academicYearList) {
  return {
    type: SET_ACADEMIC_YEAR_LIST,
    academicYearList
  };
}

export function setSectionList(sectionList) {
  return {
    type: SET_SECTION_LIST,
    sectionList,
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

export function setSectionWiseResultData(sectionWiseResultData) {
  return {
    type: SET_SECTION_WISE_RESULT_DATA,
    sectionWiseResultData
  };
}
