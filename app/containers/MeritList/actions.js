/*
 *
 * MeritList actions
 *
 */

import { DEFAULT_ACTION, SET_ACADEMIC_YEAR, SUBMIT_SEARCH_BUTTON,SET_EXAM_LIST, SET_ACADEMIC_YEAR_LIST, SET_SECTION_LIST,SET_ON_CHANGE_EXAM_TYPE, SET_ON_CHANGE_SECTION, SET_MERIT_LIST_DATA } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setAcademicYear(academicYear) {
  console.log('academicYear selected',academicYear);

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
  console.log('action academicYearList',academicYearList);

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

export function setMeritListData(meritListData) {
  return {
    type: SET_MERIT_LIST_DATA,
    meritListData
  };
}

