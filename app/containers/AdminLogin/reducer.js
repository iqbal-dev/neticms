/*
 *
 * AdminLogin reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_USER_NAME,
  SET_PASSWORD,
  SET_ADMIN_TOKEN,
  SET_ADMIN_INFO,
} from './constants';

export const initialState = fromJS({
  userName: '',
  password: '',
  adminToken: '',
  adminInfo: '',
});

function adminLoginReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_USER_NAME:
      return state.set('userName', action.userName);

    case SET_PASSWORD:
      return state.set('password', action.password);

    case SET_ADMIN_TOKEN:
      return state.set('adminToken', action.adminToken);

    case SET_ADMIN_INFO:
      return state.set('adminInfo', action.adminInfo);

    default:
      return state;
  }
}

export default adminLoginReducer;
