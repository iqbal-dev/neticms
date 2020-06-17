/*
 *
 * DonorMembers reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_DONOR_MEMBERS } from './constants';

export const initialState = fromJS({
  donorMembers: [],
});

function donorMembersReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_DONOR_MEMBERS:
      return state.set('donorMembers', action.memberList);

    default:
      return state;
  }
}

export default donorMembersReducer;
