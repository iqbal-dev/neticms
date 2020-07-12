/*
 *
 * GalleryImage actions
 *
 */

import { DEFAULT_ACTION, ADD_MODAL_STATUS, LIST_MODAL_STATUS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function setModalStatus() {
  return {
    type: ADD_MODAL_STATUS,
  };
}
export function setListModalStatus() {
  return {
    type: LIST_MODAL_STATUS,
  };
}

