import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the classRoutine state domain
 */

const selectClassRoutineDomain = state =>
  state.get('classRoutine', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClassRoutine
 */

const makeSelectClassRoutine = () =>
  createSelector(selectClassRoutineDomain, substate => substate.toJS());


const makeSelectSectionList = () =>
  createSelector(selectClassRoutineDomain, substate => substate.get('sectionList'));

const makeSelectClassConfigId = () =>
  createSelector(selectClassRoutineDomain, substate => substate.get('classConfigId'));

const makeSelectClassRoutineListData = () =>
  createSelector(selectClassRoutineDomain, substate => substate.get('classRoutineListData'));

const makeSelectDataTableLoader = () =>
  createSelector(selectClassRoutineDomain, substate => substate.get('dataTableLoader'));

const makeSelectClassLoader = () =>
  createSelector(selectClassRoutineDomain, substate => substate.get('classLoader'));


export default makeSelectClassRoutine;
export { 
  selectClassRoutineDomain,
  makeSelectSectionList,
  makeSelectClassConfigId,
  makeSelectClassRoutineListData,
  makeSelectDataTableLoader,
  makeSelectClassLoader
};
