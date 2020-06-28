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

const makeChangeAcademicYear = () =>
  createSelector(selectFailListDomain, substate => substate.get('changeAcademicYear'));

const makeChangeSection = () =>
  createSelector(selectFailListDomain, substate => substate.get('changeSection'));

const makeChangeExamType = () =>
  createSelector(selectFailListDomain, substate => substate.get('changeExamType'));

const makeSelectFailListData = () =>
  createSelector(selectFailListDomain, substate => substate.get('failListData'));


export default makeSelectFailList;
export { 
  selectFailListDomain, 
  makeChangeAcademicYear,
  makeChangeSection,
  makeChangeExamType,
  makeSelectFailListData
};
