/*
 *
 * FeesInfo actions
 *
 */

import { DEFAULT_ACTION, SET_CLASS_LIST, SET_ON_CHANGE_CLASS_VALUE, SUBMIT_SEARCH_BUTTON, SET_FEES_INFO_LIST } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}



export function setFeesInfoList(feesInfoList) {
  return {
    type: SET_FEES_INFO_LIST,
    feesInfoList
  };
}

export function setClassList(classList) {
  return {
    type: SET_CLASS_LIST,
    classList
  };
}

export function setOnchangeClassValue(classValue) {
  return {
    type: SET_ON_CHANGE_CLASS_VALUE,
    classValue
  };
}


export function submitSearchButton() {
  return {
    type: SUBMIT_SEARCH_BUTTON,
  };
}
