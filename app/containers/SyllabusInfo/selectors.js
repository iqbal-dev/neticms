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

const makeSelectSyllabusList = () =>
  createSelector(selectSyllabusInfoDomain, substate => substate.get("syllabusList"));

const makeSelectSyllabusRowdata = () =>
  createSelector(selectSyllabusInfoDomain, substate => substate.get("rowdata"));

const makeSelectSyllabusFile = () =>
  createSelector(selectSyllabusInfoDomain, substate => substate.get("file"));


const makeSelectLoaderType = () =>
  createSelector(selectSyllabusInfoDomain, substate => substate.get('loaderType'));

/**
 * Default selector used by SyllabusInfo
 */

const makeSelectSyllabusInfo = () =>
  createSelector(selectSyllabusInfoDomain, substate => substate.toJS());

export default makeSelectSyllabusInfo;
export {
  selectSyllabusInfoDomain, makeSelectSyllabusList, makeSelectSyllabusRowdata,
  makeSelectSyllabusFile, makeSelectLoaderType
};
