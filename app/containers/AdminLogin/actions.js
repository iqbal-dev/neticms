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
  SET_ADMIN_TOKEN,
  SET_ADMIN_INFO,
  SET_AUTH_STATUS,
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

export function setAuthStatus(authStatus) {
  return {
    type: SET_AUTH_STATUS,
    authStatus,
  };
}

export function setAdminToken(adminToken) {
  return {
    type: SET_ADMIN_TOKEN,
    adminToken,
  };
}

export function setAdminInfo(adminInfo) {
  return {
    type: SET_ADMIN_INFO,
    adminInfo,
  };
}
