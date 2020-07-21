/*
 *
 * SyllabusInfo actions
 *
 */

import { DEFAULT_ACTION, FETCH_SYLLABUS_LIST } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchSyllabusList(syllabusList) {
  return {
    type: FETCH_SYLLABUS_LIST,
    syllabusList
  };
}

