/*
 *
 * Payment actions
 *
 */

import { DEFAULT_ACTION, SET_REGISTRATION_NO, SUBMIT_SEARCH, SET_APPLICANT_INFO_LIST, ONCLICK_TO_PAY, SET_MSG_TYPE, SET_LOADER } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setRegistrationNo(regNo) {
  return {
    type: SET_REGISTRATION_NO, regNo
  };
}

export function submitSearch() {
  return {
    type: SUBMIT_SEARCH,
  };
}

export function setApplicantInfoDetails(applicantInfoList) {
  console.log('applicantInfoList', applicantInfoList);

  return {
    type: SET_APPLICANT_INFO_LIST, applicantInfoList
  };
}

export function onClickToPay() {
  return {
    type: ONCLICK_TO_PAY,
  };
}

export function setMsgType(msgType) {
  return {
    type: SET_MSG_TYPE,
    msgType
  };
}

export function setLoader(loaderType) {
  return { type: SET_LOADER, loaderType, };
}