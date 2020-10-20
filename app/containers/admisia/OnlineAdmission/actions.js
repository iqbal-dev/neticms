/*
 *
 * OnlineAdmission actions
 *
 */

import { 
  DEFAULT_ACTION, 
  SET_CLASS_CONFIG_LIST, 
  SET_DATA_TABLE_LOADER 
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setClassConfigList(classConfigObj) {
  return {
    type: SET_CLASS_CONFIG_LIST,
    classConfigObj
  };
}

export function setDataTableLoader(dataTableLoader) {
  return {
    type: SET_DATA_TABLE_LOADER,
    dataTableLoader,
  };
}
