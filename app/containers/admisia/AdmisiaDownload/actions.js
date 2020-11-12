/*
 *
 * AdmisiaDownload actions
 *
 */

import { DEFAULT_ACTION, SET_REGISTRATION_NO, SUBMIT_SEARCH, SET_APPLICANT_INFO_LIST, SET_MESSAGE, SET_LOADER } from './constants';

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
  return {
    type: SET_APPLICANT_INFO_LIST, applicantInfoList
  };
}

export function setMessage(message) {
  return {
    type: SET_MESSAGE,
    message
  };
}

export function setLoader(loader) {
  return {
    type: SET_LOADER,
    loader
  };
}