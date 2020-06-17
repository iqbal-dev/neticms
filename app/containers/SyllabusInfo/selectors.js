import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the syllabusInfo state domain
 */

const selectSyllabusInfoDomain = state =>
  state.get('syllabusInfo', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SyllabusInfo
 */

const makeSelectSyllabusInfo = () =>
  createSelector(selectSyllabusInfoDomain, substate => substate.toJS());

export default makeSelectSyllabusInfo;
export { selectSyllabusInfoDomain };
