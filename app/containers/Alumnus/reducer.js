/*
 *
 * Alumnus reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_ALUMNUS_LIST } from './constants';

export const initialState = fromJS({
  alumnusList: [],
});

function alumnusReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_ALUMNUS_LIST:
      return state.set('alumnusList', action.alumnusList);

    default:
      return state;
  }
}

export default alumnusReducer;
