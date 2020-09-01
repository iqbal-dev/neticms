/*
 *
 * DonorMembers reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_DONOR_MEMBERS, SET_LOADER } from './constants';

export const initialState = fromJS({
  donorMembers: [],
});

function donorMembersReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_DONOR_MEMBERS:
      return state.set('donorMembers', action.memberList);

    case SET_LOADER:
      return state.set('loaderType', action.loaderType);

    default:
      return state;
  }
}

export default donorMembersReducer;
