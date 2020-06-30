/*
 *
 * FindPayslip reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_PANEL_TAB_STATUS, SET_ON_CHANGE_ACADEMIC_YEAR } from './constants';

export const initialState = fromJS({
  activeTab: '1',
});

function findPayslipReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
      
    case SET_PANEL_TAB_STATUS:
      return state.set('activeTab', action.activeId);

    case SET_ON_CHANGE_ACADEMIC_YEAR:
      return state.set('acYear', action.acYear);
  

    default:
      return state;
  }
}

export default findPayslipReducer;
