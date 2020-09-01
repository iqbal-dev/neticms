/*
 *
 * StuffInformation actions
 *
 */

import { DEFAULT_ACTION, SET_STAFF_INFO_LIST, STUFF_SEARCH_BUTTON, SET_STUFF_INFORMATION_ROWDATA, SET_LOADER } from './constants';

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
  return {
    type: STUFF_SEARCH_BUTTON,
  };
}

export function onSubmitStuffInfoSetRowData(rowData) {
  return {
    type: SET_STUFF_INFORMATION_ROWDATA,
    rowData
  };
}

export function setLoader(loaderType) {
  return { type: SET_LOADER, loaderType, };
}








