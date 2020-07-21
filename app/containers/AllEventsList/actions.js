/*
 *
 * AllEventsList actions
 *
 */

import { DEFAULT_ACTION, FETCH_ALL_EVENTS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAllEventsList(allEventsList) {
  return {
    type: FETCH_ALL_EVENTS,
    allEventsList
  };
}
