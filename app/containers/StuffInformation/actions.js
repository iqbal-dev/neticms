/*
 *
 * StuffInformation actions
 *
 */

import { DEFAULT_ACTION, SET_STAFF_INFO_LIST, STUFF_SEARCH_BUTTON, SET_STUFF_INFORMATION_ROWDATA } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setStaffInfoList(staffInfoList) {
  return {
    type: SET_STAFF_INFO_LIST,
    staffInfoList,
  };
}

export function onSubmitStuffInfoSearchBtn() {
  console.log('banna in action');
  return {
    type: STUFF_SEARCH_BUTTON,
  };
}

export function onSubmitStuffInfoSetRowData(rowData) {
  console.log('banna in action');
  return {
    type: SET_STUFF_INFORMATION_ROWDATA,
    rowData
  };
}








