import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the donorMembers state domain
 */

const selectDonorMembersDomain = state =>
  state.get('donorMembers', initialState);

/**
 * Other specific selectors
 */

const makeSelectDonorMembersList = () =>
  createSelector(selectDonorMembersDomain, substate => substate.get('donorMembers'));
/**
 * Default selector used by DonorMembers
 */

const makeSelectDonorMembers = () =>
  createSelector(selectDonorMembersDomain, substate => substate.toJS());

export default makeSelectDonorMembers;
export {
  selectDonorMembersDomain,
  makeSelectDonorMembersList
};
