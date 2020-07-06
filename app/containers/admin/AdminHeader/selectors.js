import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminHeader state domain
 */

const selectAdminHeaderDomain = state => state.get('adminHeader', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminHeader
 */

const makeSelectAdminHeader = () =>
  createSelector(selectAdminHeaderDomain, substate => substate.toJS());

export default makeSelectAdminHeader;
export { selectAdminHeaderDomain };
