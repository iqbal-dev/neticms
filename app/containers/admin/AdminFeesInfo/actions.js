/*
 *
 * AdminFeesInfo actions
 *
 */

import { DEFAULT_ACTION, GET_FEES_INFO_LIST } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getFeesInfoListData(feesInfoList) {
  return {
    type: GET_FEES_INFO_LIST,
    feesInfoList
  };
}