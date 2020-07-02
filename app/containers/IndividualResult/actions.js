/*
 *
 * IndividualResult actions
 *
 */

import { 
  DEFAULT_ACTION, 
  SET_ON_CHANGE_STUDENT_ID, 
  SET_ON_CHANGE_STUDENT_MOBILE,
  SUBMIT_SEARCH_BUTTON, 
  SET_ACADEMIC_YEAR_LIST,
  SET_ON_CHANGE_ACADEMIC_YEAR,
  SET_EXAM_LIST,
  SET_ON_CHANGE_EXAM_TYPE,
  SET_INDIVIDUAL_RESULT_DATA
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function makeChangeStudentID(stdID) {
  return {
    type: SET_ON_CHANGE_STUDENT_ID,
    stdID
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

export function makeChangeStudentMobile(stdMobile) {
  return {
    type: SET_ON_CHANGE_STUDENT_MOBILE,
    stdMobile
  };
}

export function setExamList(examList) {
  return {
    type: SET_EXAM_LIST,
    examList,
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

export function setIndividualResultData(resultData) {
  return {
    type: SET_INDIVIDUAL_RESULT_DATA,
    resultData,
  };
}


