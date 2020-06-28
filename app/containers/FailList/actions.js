/*
 *
 * FailList actions
 *
 */

import { 
  DEFAULT_ACTION, 
  SET_ON_CHANGE_ACADEMIC_YEAR, 
  SET_ON_CHANGE_SECTION,
  SET_ON_CHANGE_EXAM_TYPE,
  SET_FAIL_LIST_DATA
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function makeChangeAcademicYear(yearData) {
  console.log('yearData in action');
  return {
    type: SET_ON_CHANGE_ACADEMIC_YEAR,
    yearData
  };
}

export function makeChangeSection(sectionData) {
  console.log('sectionData in action');
  return {
    type: SET_ON_CHANGE_SECTION,
    sectionData
  };
}

export function makeChangeExamType(examTypeData) {
  console.log('examTypeData in action');
  return {
    type: SET_ON_CHANGE_EXAM_TYPE,
    examTypeData
  };
}

export function setFailListData(failListData) {
  return {
    type: SET_FAIL_LIST_DATA,
    failListData,
  };
}
