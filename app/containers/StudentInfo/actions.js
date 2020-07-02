/*
 *
 * StudentInfo actions
 *
 */

import { DEFAULT_ACTION, CLASS_NAME_DROPDOWN_LIST, CLASS_NAME_SELECTED, CLASS_GROUP_NAME_DROPDOWN_LIST, SUBMIT_SEARCH_BUTTON, STUDENT_SEARCH_RESULT, CLASS_GROUP_NAME_SELECTED } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}


export function classNameListDropDown(classNamesDropdown) {
  
  return {
    type: CLASS_NAME_DROPDOWN_LIST,
    classNamesDropdown,
  };

}

export function classNameSelectedMethod(classNameSelected) {
  
  return {
    type: CLASS_NAME_SELECTED,
    classNameSelected,
  };

}

export function classGroupListDropDown(groupList) {
  
  return {
    type: CLASS_GROUP_NAME_DROPDOWN_LIST,
    groupList,
  };

}

export function groupNameSelectedMethod(groupNameSelected) {
  
  return {
    type: CLASS_GROUP_NAME_SELECTED,
    groupNameSelected,
  };

}

export function submitSearchButton() {
  
  return {
    type: SUBMIT_SEARCH_BUTTON,
  };

}

export function studentSearchResult(studentInfoResult) {
  
  return {
    type: STUDENT_SEARCH_RESULT,
    studentInfoResult,
  };

}
