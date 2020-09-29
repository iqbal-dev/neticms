/*
 *
 * Alumnus actions
 *
 */

import { DEFAULT_ACTION, SET_ALUMNUS_LIST } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setAlumnusList(alumnusList) {
  return {
    type: SET_ALUMNUS_LIST,
    alumnusList,
  };
}