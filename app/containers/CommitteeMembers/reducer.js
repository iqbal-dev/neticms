/*
 *
 * CommitteeMembers reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_COMMITTEE_MEMBERS } from './constants';

export const initialState = fromJS({
  committeeMemberList: []
});

function committeeMembersReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
      case SET_COMMITTEE_MEMBERS:
        return state.set('committeeMemberList', action.committeeMemberList);
    default:
      return state;
  }
}

export default committeeMembersReducer;
