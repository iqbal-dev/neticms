import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminHomepage state domain
 */

const selectAdminHomepageDomain = state =>
  state.get('adminHomepage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminHomepage
 */

const makeSelectAdminHomepage = () =>
  createSelector(selectAdminHomepageDomain, substate => substate.toJS());

export default makeSelectAdminHomepage;
export { selectAdminHomepageDomain };
