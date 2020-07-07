/*
 *
 * AdminLogin actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_USER_NAME,
  SET_PASSWORD,
  SUBMIT_LOGIN,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setUserName(userName) {
  return {
    type: SET_USER_NAME,
    userName,
  };
}

export function setPassword(password) {
  return {
    type: SET_PASSWORD,
    password,
  };
}

export function submitLogin() {
  return {
    type: SUBMIT_LOGIN,
  };
}
