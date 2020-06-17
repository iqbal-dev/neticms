import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the footer state domain
 */

const selectFooterDomain = state => state.get('footer', initialState);

/**
 * Other specific selectors
 */
const makeSelectName = () =>
  createSelector(selectFooterDomain, substate => substate.get(''));

const makeSelectMobileNo = () =>
  createSelector(selectFooterDomain, substate => substate.get('mobileNo'));

const makeSelectEmail = () =>
  createSelector(selectFooterDomain, substate => substate.get('email'));

const makeSelectMessageDetails = () =>
  createSelector(selectFooterDomain, substate => substate.get('messageDetails'));

/**
 * Default selector used by Footer
 */

const makeSelectFooter = () =>
  createSelector(selectFooterDomain, substate => substate.toJS());

export default makeSelectFooter;
export { selectFooterDomain,
  makeSelectName,
  makeSelectMobileNo,
  makeSelectEmail,
  makeSelectMessageDetails,
};
