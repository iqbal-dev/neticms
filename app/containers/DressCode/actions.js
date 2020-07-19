/*
 *
 * DressCode actions
 *
 */

import { DEFAULT_ACTION, SET_DRESS_CODE_LIST, SET_PANEL_TAB_STATUS, SET_PANEL_MALE_TAB_STATUS, SET_MALE_DRESS_CODE_LIST, SET_FEMALE_DRESS_CODE_LIST, SET_COMBINED_DRESS_CODE_LIST } from './constants';

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

export function setMaleDressCodeList(maleDressCodeList) {
  return {
    type: SET_MALE_DRESS_CODE_LIST,
    maleDressCodeList
  };
}

export function setFemaleDressCodeList(femaleDressCodeList) {
  return {
    type: SET_FEMALE_DRESS_CODE_LIST,
    femaleDressCodeList
  };
}

export function setCombinedDressCodeList(combinedDressCodeList) {
  return {
    type: SET_COMBINED_DRESS_CODE_LIST,
    combinedDressCodeList
  };
}
