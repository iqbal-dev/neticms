/*
 *
 * DonorMembers actions
 *
 */

import { DEFAULT_ACTION, SET_DONOR_MEMBERS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setDonorMembers(memberList) {
  return {
    type: SET_DONOR_MEMBERS,
    memberList,
  };
}