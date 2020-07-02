/*
 *
 * FindPayslip reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  DEFAULT_ACTION, 
  SET_PANEL_TAB_STATUS, 
  SET_ON_CHANGE_ACADEMIC_YEAR, 
  SET_ACADEMIC_YEAR_LIST, 
  SET_ON_CHANGE_STUDENT_ID,
  SET_PAY_SLIP_LIST_DATA
} from './constants';

export const initialState = fromJS({
  activeTab: '1',
  paySlipListData:[],
});

function findPayslipReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
      
    case SET_PANEL_TAB_STATUS:
      return state.set('activeTab', action.activeId);

    case SET_ACADEMIC_YEAR_LIST:
      return state.set('yearList', action.yearList);

    case SET_ON_CHANGE_ACADEMIC_YEAR:
      return state.set('acYear', action.acYear);

    case SET_ON_CHANGE_STUDENT_ID:
      return state.set('stdID', action.stdID);
  
    case SET_PAY_SLIP_LIST_DATA:
      return state.set('paySlipListData', action.paySlipListData);
  

    default:
      return state;
  }
}

export default findPayslipReducer;
