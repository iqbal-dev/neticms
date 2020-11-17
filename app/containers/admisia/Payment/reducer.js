/*
 *
 * Payment reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SET_REGISTRATION_NO, SET_APPLICANT_INFO_LIST,
  SET_MSG_TYPE, SET_LOADER
} from './constants';

export const initialState = fromJS({
  regNo: '',
  applicantInfos: [],
  msgType: 0,
  loaderType: '',
});

function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_REGISTRATION_NO:
      return state.set('regNo', action.regNo);

    case SET_APPLICANT_INFO_LIST:
      return state.set('applicantInfos', action.applicantInfoList);

    case SET_APPLICANT_INFO_LIST:
      return state.set('msgType', action.msgType);

    case SET_LOADER:
      return state.set('loaderType', action.loaderType);

    default:
      return state;
  }
}

export default paymentReducer;
