/*
 *
 * DressCode actions
 *
 */

import { DEFAULT_ACTION, SET_DRESS_CODE_LIST, SET_PANEL_TAB_STATUS, SET_PANEL_MALE_TAB_STATUS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setDressCodeList(dressCodeList) {
  return {
    type: SET_DRESS_CODE_LIST,
    dressCodeList,
  };
}

export function setActivePanel(activeId) {  
  return {
    type: SET_PANEL_TAB_STATUS,
    activeId
  };
}

export function setActiveMalePanel() {
  return {
    type: SET_PANEL_MALE_TAB_STATUS,
  };
}
