import { 
  SET_SECTION_LIST, 
  SET_ON_CHANGE_SECTION,
  SUBMIT_SEARCH_BUTTON,
  SET_CLASS_ROUTINE_LIST_DATA,
  SET_DATA_TABLE_LOADER,
  SET_CLASS_LOADER
} from './constants';
/*
 *
 * ClassRoutine actions
 *
 */

import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setSectionList(sectionList) {
  return {
    type: SET_SECTION_LIST,
    sectionList,
  };
}

export function makeChangeSection(classConfigId) {
  return {
    type: SET_ON_CHANGE_SECTION,
    classConfigId
  };
}

export function submitSearchHandle() {
  return {
    type: SUBMIT_SEARCH_BUTTON,
  };
}

export function setClassRoutineListData(classRoutineListData) {
  return {
    type: SET_CLASS_ROUTINE_LIST_DATA,
    classRoutineListData,
  };
}

export function setDataTableLoader(dataTableLoader) {
  return {
    type: SET_DATA_TABLE_LOADER,
    dataTableLoader,
  };
}

export function setClassLoader(classLoader) {
  return {
    type: SET_CLASS_LOADER,
    classLoader,
  };
}

// setClassRoutineListData
