/*
 *
 * EventGallery actions
 *
 */

import { DEFAULT_ACTION, SET_MODAL_STATUS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setModalVisiableStatus() {
  return {
    type: SET_MODAL_STATUS,
  };
}
