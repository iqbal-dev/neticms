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
const makeSelectCommitteeMemberList = () =>
  createSelector(selectCommitteeMembersDomain, substate => substate.get('committeeMemberList'));

const makeSelectCommitteeloaderType = () =>
  createSelector(selectCommitteeMembersDomain, substate => substate.get('loaderType'));
/**
 * Default selector used by CommitteeMembers
 */

const makeSelectCommitteeMembers = () =>
  createSelector(selectCommitteeMembersDomain, substate => substate.toJS());

export default makeSelectCommitteeMembers;
export { selectCommitteeMembersDomain, makeSelectCommitteeMemberList, makeSelectCommitteeloaderType };
