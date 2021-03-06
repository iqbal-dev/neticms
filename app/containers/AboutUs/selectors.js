import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the aboutUs state domain
 */

const selectAboutUsDomain = state => state.get('aboutUs', initialState);

/**
 * Other specific selectors
 */
const makeSelectHistory = () =>
createSelector(selectAboutUsDomain, substate => substate.get('history'));
/**
 * Default selector used by AboutUs
 */

const makeSelectAboutUs = () =>
  createSelector(selectAboutUsDomain, substate => substate.toJS());

export default makeSelectAboutUs;
export { 
  selectAboutUsDomain,
  makeSelectHistory,
 };
