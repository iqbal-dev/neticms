import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminLogin state domain
 */

const selectAdminLoginDomain = state => state.get('adminLogin', initialState);

/**
 * Other specific selectors
 */
const makeSelectUserName = () =>
  createSelector(selectAdminLoginDomain, substate => substate.get('userName'));

const makeSelectPassword = () =>
  createSelector(selectAdminLoginDomain, substate => substate.get('password'));

const makeSelectAdminToken = () =>
  createSelector(selectAdminLoginDomain, substate => substate.get('adminToken'));

const makeSelectAdminInfo = () =>
  createSelector(selectAdminLoginDomain, substate => substate.get('adminInfo'));
/**
 * Default selector used by AdminLogin
 */

const makeSelectAdminLogin = () =>
  createSelector(selectAdminLoginDomain, substate => substate.toJS());

export default makeSelectAdminLogin;
export {
  selectAdminLoginDomain,
  makeSelectUserName,
  makeSelectPassword,
  makeSelectAdminToken,
  makeSelectAdminInfo
};
