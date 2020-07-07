import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminSideBar state domain
 */

const selectAdminSideBarDomain = state =>
  state.get('adminSideBar', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminSideBar
 */

const makeSelectAdminSideBar = () =>
  createSelector(selectAdminSideBarDomain, substate => substate.toJS());

export default makeSelectAdminSideBar;
export { selectAdminSideBarDomain };
