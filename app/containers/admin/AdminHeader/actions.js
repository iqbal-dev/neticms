/*
 *
 * AdminHeader actions
 *
 */

import { DEFAULT_ACTION, HANDLE_LOGOUT } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}


export function handleLogout() {
  return {
    type: HANDLE_LOGOUT,
  };
}
