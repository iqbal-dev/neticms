/*
 *
 * SeatInfo actions
 *
 */

import { DEFAULT_ACTION, SET_SEAT_INFO_LIST } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setSeatInfoList(seatInfoList) {
  return {
    type: SET_SEAT_INFO_LIST,
    seatInfoList,
  };
}
