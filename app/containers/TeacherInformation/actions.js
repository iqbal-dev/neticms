/*
 *
 * TeacherInformation actions
 *
 */

import { DEFAULT_ACTION, TEACHER_INFORMATON_LIST } from './constants';

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
