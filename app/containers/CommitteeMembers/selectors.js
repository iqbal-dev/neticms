import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the committeeMembers state domain
 */

const selectCommitteeMembersDomain = state =>
  state.get('committeeMembers', initialState);
  const makeSelectCommitteeMemberList = () =>
  createSelector(selectCommitteeMembersDomain, substate => substate.get('committeeMemberList'));

/**
 * Other specific selectors
 */

/**
 * Default selector used by CommitteeMembers
 */

const makeSelectCommitteeMembers = () =>
  createSelector(selectCommitteeMembersDomain, substate => substate.toJS());

export default makeSelectCommitteeMembers;
export { selectCommitteeMembersDomain,makeSelectCommitteeMemberList };
