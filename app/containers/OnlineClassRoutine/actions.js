/*
 *
 * OnlineClassRoutine actions
 *
 */

import {
  DEFAULT_ACTION, SET_CLASS_LIST, SET_CLASS_ID, SET_GROUP_LIST, SET_GROUP_ID, SET_DATE, SUBMIT_SEARCH_BTN, SET_ONLINE_CLASS_ROUTINE_LIST, SET_LOADER
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setClassConfigList(classConfigList) {
  return {
    type: SET_CLASS_LIST, classConfigList
  };
}

export function setClassConfigId(classConfigId) {
  return {
    type: SET_CLASS_ID, classConfigId
  };
}

export function setGroupList(groupList) {
  return {
    type: SET_GROUP_LIST, groupList
  };
}

export function setGroupId(groupId) {
  return {
    type: SET_GROUP_ID, groupId
  };
}

export function setDate(date) {
  return {
    type: SET_DATE, date
  };
}

export function submitSearch() {
  return {
    type: SUBMIT_SEARCH_BTN,
  };
}

export function setOnlineClassRoutineList(onlineClassRoutineList) {
  return {
    type: SET_ONLINE_CLASS_ROUTINE_LIST, onlineClassRoutineList
  };
}

export function setLoader(loader) {
  return {
    type: SET_LOADER, loader
  };
}
