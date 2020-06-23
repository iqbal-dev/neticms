import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the individualResult state domain
 */

const selectIndividualResultDomain = state =>
  state.get('individualResult', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by IndividualResult
 */

const makeSelectIndividualResult = () =>
  createSelector(selectIndividualResultDomain, substate => substate.toJS());

export default makeSelectIndividualResult;
export { selectIndividualResultDomain };
