import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the failList state domain
 */

const selectFailListDomain = state => state.get('failList', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by FailList
 */

const makeSelectFailList = () =>
  createSelector(selectFailListDomain, substate => substate.toJS());

export default makeSelectFailList;
export { selectFailListDomain };
