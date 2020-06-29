import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.get('homePage', initialState);

/**
 * Other specific selectors
 */

const makeSelectUrlInfo = () =>
  createSelector(selectHomePageDomain, substate => substate.get('urlInfo'));

const makeSelectUrlId = () =>
  createSelector(selectHomePageDomain, substate => substate.get('urlId'));

const makeSelectAccessToken = () =>
  createSelector(selectHomePageDomain, substate => substate.get('accessToken'));

const makeSelectMenuList = () =>
  createSelector(selectHomePageDomain, substate => substate.get('menuList'));

const makeSelectLatestNewsList = () =>
  createSelector(selectHomePageDomain, substate => substate.get('newsList'));

const makeSelectWelcomeSpeech = () =>
  createSelector(selectHomePageDomain, substate => substate.get('welcomeSpeech'));

const makeSelectNoticeList = () =>
  createSelector(selectHomePageDomain, substate => substate.get('noticeList'));

const makeSelectHistoryDetails = () =>
  createSelector(selectHomePageDomain, substate => substate.get('historyDetails'));

const makeSelectTopEvents = () =>
  createSelector(selectHomePageDomain, substate => substate.get('topEvents'));

const makeSelectLoaderStatus = () =>
  createSelector(selectHomePageDomain, substate => substate.get('loadingStatus'));

const makeSelectAcademicYearList = () =>
  createSelector(selectHomePageDomain, substate => substate.get('academicYearList'));

const makeSelectSectionList = () =>
  createSelector(selectHomePageDomain, substate => substate.get('sectionList'));

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.toJS());

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectUrlInfo,
  makeSelectLoaderStatus,
  makeSelectUrlId,
  makeSelectAccessToken,
  makeSelectMenuList,
  makeSelectLatestNewsList,
  makeSelectWelcomeSpeech,
  makeSelectNoticeList,
  makeSelectHistoryDetails,
  makeSelectTopEvents,
  makeSelectAcademicYearList,
  makeSelectSectionList,
};
