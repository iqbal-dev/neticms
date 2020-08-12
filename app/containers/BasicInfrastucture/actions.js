/*
 *
 * BasicInfrastucture actions
 *
 */

import { DEFAULT_ACTION, INFRASTRUCTURE_LIST } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchInfrastructureList(infrastructureList){
  return{
    type: INFRASTRUCTURE_LIST,
    infrastructureList
  }
}
