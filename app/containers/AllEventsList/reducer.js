/*
 *
 * AllEventsList reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, FETCH_ALL_EVENTS } from './constants';

export const initialState = fromJS({
  allEventsList: ""
});

function allEventsListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_ALL_EVENTS:
      return state.set("allEventsList", action.allEventsList);
    default:
      return state;
  }
}

export default allEventsListReducer;
