/*
 *
 * Footer reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_NAME, SET_MOBILE, SET_EMAIL, SET_MESSAGE } from './constants';

export const initialState = fromJS({
  name: '',
  mobileNo: '',
  email: '',
  messageDetails: '',
});

function footerReducer(state = initialState, action) {
  switch (action.type) {

    case DEFAULT_ACTION:
      return state;

    case SET_NAME:
      return state.set('name', action.name);

    case SET_MOBILE:
      return state.set('mobileNo', action.mobileNo);

    case SET_EMAIL:
      return state.set('email', action.email);

    case SET_MESSAGE:
      return state.set('messageDetails', action.messageDetails);

    default:
      return state;
  }
}

export default footerReducer;
