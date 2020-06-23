/*
 *
 * FindPayslip reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_PANEL_TAB_STATUS } from './constants';

export const initialState = fromJS({
  activeTab: '1',
});

function findPayslipReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
      
    case SET_PANEL_TAB_STATUS:
      return state.set('activeTab', action.activeId);

    default:
      return state;
  }
}

export default findPayslipReducer;
