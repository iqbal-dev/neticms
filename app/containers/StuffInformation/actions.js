/*
 *
 * StuffInformation actions
 *
 */

import { DEFAULT_ACTION, SET_STAFF_INFO_LIST } from './constants';

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