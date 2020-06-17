import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the stuffInformation state domain
 */

const selectStuffInformationDomain = state =>
  state.get('stuffInformation', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by StuffInformation
 */

const makeSelectStuffInformation = () =>
  createSelector(selectStuffInformationDomain, substate => substate.toJS());

export default makeSelectStuffInformation;
export { selectStuffInformationDomain };
