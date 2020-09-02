import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the allNotice state domain
 */

const selectAllNoticeDomain = state => state.get('allNotice', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AllNotice
 */

const makeSelectAllNotice = () =>
  createSelector(selectAllNoticeDomain, substate => substate.toJS());

const makeSelectNoticeRowdata = () =>
  createSelector(selectAllNoticeDomain, substate => substate.get("singleRowData"));

const makeSelectNoticeFileContent = () =>
  createSelector(selectAllNoticeDomain, substate => substate.get("singleFileContent"));

const makeSelectGetDownloadFile = () =>
  createSelector(selectAllNoticeDomain, substate => substate.get('downloadFile'));

const makeSelectAllNoticeLoaderType = () =>
  createSelector(selectAllNoticeDomain, substate => substate.get('loaderType'));

export default makeSelectAllNotice;
export { selectAllNoticeDomain, makeSelectNoticeRowdata, makeSelectNoticeFileContent, makeSelectGetDownloadFile, makeSelectAllNoticeLoaderType };
