/*
 *
 * ForgetRegistrationNo reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_MOBILE_NO, SET_APPLICANT_INFO_LIST, SET_LOADER, SET_MESSAGE } from './constants';

export const initialState = fromJS({
  mobileNo: '',
  applicantInfoList: [],
});

function forgetRegistrationNoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_MOBILE_NO:
      return state.set('mobileNo', action.mobileNo);

    case SET_APPLICANT_INFO_LIST:
      return state.set('applicantInfoList', action.applicantInfoList);

    case SET_LOADER:
      return state.set('loaderType', action.loaderType);

    case SET_MESSAGE:
      return state.set('message', action.message);

    default:
      return state;
  }
}

export default forgetRegistrationNoReducer;
