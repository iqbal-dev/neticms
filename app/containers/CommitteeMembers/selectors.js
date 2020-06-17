import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the committeeMembers state domain
 */

const selectCommitteeMembersDomain = state =>
  state.get('committeeMembers', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CommitteeMembers
 */

const makeSelectCommitteeMembers = () =>
  createSelector(selectCommitteeMembersDomain, substate => substate.toJS());

export default makeSelectCommitteeMembers;
export { selectCommitteeMembersDomain };
