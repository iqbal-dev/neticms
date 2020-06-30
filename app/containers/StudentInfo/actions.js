/*
 *
 * StudentInfo actions
 *
 */

import { DEFAULT_ACTION, CLASS_NAME_LIST } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function classNameList(classNamesList) {
  return {
    type: CLASS_NAME_LIST,
    classNamesList,
  };
}
