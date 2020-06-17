import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sectionWiseAttendance state domain
 */

const selectSectionWiseAttendanceDomain = state =>
  state.get('sectionWiseAttendance', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SectionWiseAttendance
 */

const makeSelectSectionWiseAttendance = () =>
  createSelector(selectSectionWiseAttendanceDomain, substate =>
    substate.toJS(),
  );

export default makeSelectSectionWiseAttendance;
export { selectSectionWiseAttendanceDomain };
