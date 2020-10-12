import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the applicationForm state domain
 */

const selectApplicationFormDomain = state =>
  state.get('applicationForm', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ApplicationForm
 */

const makeSelectApplicationForm = () =>
  createSelector(selectApplicationFormDomain, substate => substate.toJS());

export default makeSelectApplicationForm;
export { selectApplicationFormDomain };
