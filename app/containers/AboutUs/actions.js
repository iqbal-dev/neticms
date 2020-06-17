/*
 *
 * AboutUs actions
 *
 */

import { DEFAULT_ACTION, SET_ABOUT_HISTORY } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setAboutHistory(history) {
  return {
    type: SET_ABOUT_HISTORY,
    history,
  };
}
