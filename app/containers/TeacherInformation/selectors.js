import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the teacherInformation state domain
 */

const selectTeacherInformationDomain = state =>
  state.get('teacherInformation', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TeacherInformation
 */

const makeSelectTeacherInformation = () =>
  createSelector(selectTeacherInformationDomain, substate => substate.toJS());

export default makeSelectTeacherInformation;
export { selectTeacherInformationDomain };
