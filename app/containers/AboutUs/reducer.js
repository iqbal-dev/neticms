/*
 *
 * AboutUs reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_ABOUT_HISTORY } from './constants';

export const initialState = fromJS({
  history: '',
});

function aboutUsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_ABOUT_HISTORY:
      return state.set('history', action.history);

    default:
      return state;
  }
}

export default aboutUsReducer;
