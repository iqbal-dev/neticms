/*
 *
 * StudentInfo actions
 *
 */

import { DEFAULT_ACTION, CLASS_NAME_DROPDOWN_LIST, CLASS_NAME_SELECTED } from './constants';

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
