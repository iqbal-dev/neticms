import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the feesInfo state domain
 */

const selectFeesInfoDomain = state => state.get('feesInfo', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by FeesInfo
 */

const makeSelectFeesInfo = () =>
  createSelector(selectFeesInfoDomain, substate => substate.toJS());

export default makeSelectFeesInfo;
export { selectFeesInfoDomain };
