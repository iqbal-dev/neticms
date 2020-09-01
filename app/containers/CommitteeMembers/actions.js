/*
 *
 * CommitteeMembers actions
 *
 */

import { DEFAULT_ACTION, SET_COMMITTEE_MEMBERS, SET_LOADER } from './constants';

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

export function setLoader(loaderType) {
  return { type: SET_LOADER, loaderType, };
}
