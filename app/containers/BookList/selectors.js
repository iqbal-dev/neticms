import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the bookList state domain
 */

const selectBookListDomain = state => state.get('bookList', initialState);

/**
 * Other specific selectors
 */
const makeSelectAllClassList = () =>
  createSelector(selectBookListDomain, substate => substate.get('allClassList'));

const makeSelectBookListByClassId = () =>
  createSelector(selectBookListDomain, substate => substate.get('classId'));

const makeSelectAllBookList = () =>
  createSelector(selectBookListDomain, substate => substate.get('allBookList'));

const makeSelectBookListLoaderType = () =>
  createSelector(selectBookListDomain, substate => substate.get('loaderType'));

const makeSelectModalVisibleStatus = () =>
  createSelector(selectBookListDomain, substate =>
    substate.get('modalVisible'));

/**
 * Default selector used by BookList
 */

const makeSelectBookList = () =>
  createSelector(selectBookListDomain, substate => substate.toJS());

export default makeSelectBookList;
export {
  selectBookListDomain,
  makeSelectModalVisibleStatus,
  makeSelectAllClassList,
  makeSelectBookListByClassId,
  makeSelectAllBookList,
  makeSelectBookListLoaderType,
};
