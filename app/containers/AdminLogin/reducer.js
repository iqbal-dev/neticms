/*
 *
 * AdminLogin reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_USER_NAME, SET_PASSWORD } from './constants';

export const initialState = fromJS({
  userName: '',
  password: '',
});

function adminLoginReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_USER_NAME:
      return state.set('userName', action.userName);

    case SET_PASSWORD:
      return state.set('password', action.password);

    default:
      return state;
  }
}

export default adminLoginReducer;
