import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sectionWiseResult state domain
 */

const selectSectionWiseResultDomain = state =>
  state.get('sectionWiseResult', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SectionWiseResult
 */

const makeSelectSectionWiseResult = () =>
  createSelector(selectSectionWiseResultDomain, substate => substate.toJS());

export default makeSelectSectionWiseResult;
export { selectSectionWiseResultDomain };
