/*
 *
 * Footer actions
 *
 */

import { DEFAULT_ACTION, SET_NAME, SET_MOBILE, SET_EMAIL, SET_MESSAGE, SUBMIT_CONTACT } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setName(name) {
  return {
    type: SET_NAME,
    name,
  };
}

export function setMobile(mobileNo) {
  return {
    type: SET_MOBILE,
    mobileNo,
  };
}

export function setEmail(email) {
  return {
    type: SET_EMAIL,
    email,
  };
}

export function setMessage(messageDetails) {
  return {
    type: SET_MESSAGE,
    messageDetails,
  };
}

export function submitContact() {
  return {
    type: SUBMIT_CONTACT,
  };
}