/*
 *
 * Payment reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_REGISTRATION_NO, SET_APPLICANT_INFO_LIST } from './constants';

export const initialState = fromJS({
  regNo: '',
  applicantInfoList: [],
});

function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_REGISTRATION_NO:
      return state.set('regNo', action.regNo);

    case SET_APPLICANT_INFO_LIST:
      return state.set('applicantInfoList', action.applicantInfoList);

    default:
      return state;
  }
}

export default paymentReducer;
