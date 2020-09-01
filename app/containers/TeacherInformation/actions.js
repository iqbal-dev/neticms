/*
 *
 * TeacherInformation actions
 *
 */

import { DEFAULT_ACTION, TEACHER_INFORMATON_LIST, SET_LOADER } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function teacherInformationList(teacherList) {
  return {
    type: TEACHER_INFORMATON_LIST,
    teacherList
  };
}

export function setLoader(loaderType) {
  return { type: SET_LOADER, loaderType, };
}
