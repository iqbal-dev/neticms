/*
 *
 * ForgetRegistrationNo actions
 *
 */

import { DEFAULT_ACTION, SET_MOBILE_NO, SUBMIT_SEARCH, SET_APPLICANT_INFO_LIST, SET_LOADER, SET_MESSAGE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setMobileNo(mobileNo) {
  return {
    type: SET_MOBILE_NO, mobileNo
  };
}

export function submitSearch() {
  return {
    type: SUBMIT_SEARCH,
  };
}

export function setApplicantInfoDetails(applicantInfoList) {
  return {
    type: SET_APPLICANT_INFO_LIST, applicantInfoList
  };
}

export function setLoader(loaderType) {
  return { type: SET_LOADER, loaderType, };
}

export function setMessage(message) {
  return {
    type: SET_MESSAGE,
    message
  };
}