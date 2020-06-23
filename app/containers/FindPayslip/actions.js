/*
 *
 * FindPayslip actions
 *
 */

import { DEFAULT_ACTION, SET_PANEL_TAB_STATUS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setActivePanel(activeId) {  
  return {
    type: SET_PANEL_TAB_STATUS,
    activeId
  };
}
