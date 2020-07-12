/*
 *
 * AdminFeesInfo reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, GET_FEES_INFO_LIST,SET_SAVE_ONCHANGE_FEE_PAYMENT_MODE,GET_DATATABLE_ROWDATA,SET_MODAL_STATUS,
  SET_SAVE_ONCHANGE_FEE_NAME,GET_CLASS_INFO_LIST,GET_GROUP_INFO_LIST,SET_SAVE_ONCHANGE_SERIAL_NO,SET_SAVE_ONCHANGE_CLASS_LIST_VALUE,SET_SAVE_ONCHANGE_GROUP_LIST_VALUE, SET_SAVE_ONCHANGE_FEE_DETAILS,SET_SAVE_ONCHANGE_FEE_AMOUNT, SET_SAVE_ONCHANGE_FEE_TYPE, SAVE_FEE_INFO, UPDATE_FEE_INFO } from './constants';


export const initialState = fromJS({
  feesInfoList: [],
  serialNo: '',
  selectedClass: '',
  selectedGroup: '',
  feeName: '',
  feeDetails: '',
  feeAmount: '',
  feeType: '',
  classInfoList: [],
  groupInfoList: [],
  paymentMode: '',
  rowData: '',
  modalVisible: false,


});

function adminFeesInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_FEES_INFO_LIST:
      return state.set('feesInfoList', action.feesInfoList);
    case GET_CLASS_INFO_LIST:
      return state.set('classInfoList', action.classInfoList);
    case GET_GROUP_INFO_LIST:
      return state.set('groupInfoList', action.groupInfoList);
    case SET_SAVE_ONCHANGE_SERIAL_NO:
      return state.set('serialNo', action.serialNo);
    case SET_SAVE_ONCHANGE_CLASS_LIST_VALUE:
      return state.set('selectedClass', action.selectedClass);
    case SET_SAVE_ONCHANGE_GROUP_LIST_VALUE:
      return state.set('selectedGroup', action.selectedGroup);
    case SET_SAVE_ONCHANGE_FEE_NAME:
        return state.set('feeName', action.feeName);
    case SET_SAVE_ONCHANGE_FEE_DETAILS:
      return state.set('feeDetails', action.feeDetails);
    case SET_SAVE_ONCHANGE_FEE_AMOUNT:
      return state.set('feeAmount', action.feeAmount);
    case SET_SAVE_ONCHANGE_FEE_PAYMENT_MODE:
        return state.set('paymentMode', action.paymentMode);
    case GET_DATATABLE_ROWDATA:
          return state.set('rowData', action.rowData);
    case SET_SAVE_ONCHANGE_FEE_TYPE:
      return state.set('feeType', action.feeType);
    case SET_MODAL_STATUS:
        const status = state.get('modalVisible');
        return state.set('modalVisible', !status);

    default:
      return state;
  }
}

export default adminFeesInfoReducer;
