/*
 *
 * CommitteeMembers actions
 *
 */

import { DEFAULT_ACTION, SET_COMMITTEE_MEMBERS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setCommitteeMembers(committeeMemberList) {
  return {
    type: SET_COMMITTEE_MEMBERS,
    committeeMemberList,
  };
}



