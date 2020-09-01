/*
 *
 * BasicInfrastucture actions
 *
 */

import { DEFAULT_ACTION, INFRASTRUCTURE_LIST, SET_LOADER } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchInfrastructureList(infrastructureList) {
  return {
    type: INFRASTRUCTURE_LIST,
    infrastructureList
  }
}

export function setLoader(loaderType) {
  return { type: SET_LOADER, loaderType, };
}
