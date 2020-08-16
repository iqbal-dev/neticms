/*
 *
 * SeatInfo actions
 *
 */

import { DEFAULT_ACTION, SET_SEAT_INFO_LIST, SET_LOADER } from './constants';

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

export function setLoader(loaderType) {

  return { type: SET_LOADER, loaderType, };

}