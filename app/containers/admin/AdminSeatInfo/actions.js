/*
 *
 * AdminSeatInfo actions
 *
 */

import { 
  DEFAULT_ACTION, 
  
  GET_CLASS_LIST,
  GET_GROUP_LIST,
  GET_SEAT_INFO_LIST, 
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getClassListData(classList) {
  return {
    type: GET_CLASS_LIST,
    classList
  };
}

export function getGroupListData(groupList) {
  return {
    type: GET_GROUP_LIST,
    groupList
  };
}

export function getSeatInfoListData(seatInfoList) {
  return {
    type: GET_SEAT_INFO_LIST,
    seatInfoList
  };
}
