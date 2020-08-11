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

const makeSelectEmAccessToken = () =>
  createSelector(selectHomePageDomain, substate => substate.get('accessToken'));

const makeSelectMenuList = () =>
  createSelector(selectHomePageDomain, substate => substate.get('menuList'));

const makeSelectLatestNewsList = () =>
  createSelector(selectHomePageDomain, substate => substate.get('newsList'));

const makeSelectNoticeList = () =>
  createSelector(selectHomePageDomain, substate => substate.get('noticeList'));

const makeSelectWelcomeSpeech = () =>
  createSelector(selectHomePageDomain, substate => substate.get('welcomeSpeech'));

const makeSelectUseFullLinks = () =>
  createSelector(selectHomePageDomain, substate => substate.get('useFullLinks'));

const makeSelectHistoryDetails = () =>
  createSelector(selectHomePageDomain, substate => substate.get('historyDetails'));

const makeSelectTopEvents = () =>
  createSelector(selectHomePageDomain, substate => substate.get('topEvents'));

const makeSelectLoaderStatus = () =>
  createSelector(selectHomePageDomain, substate => substate.get('loadingStatus'));

const makeSelectAcademicYearList = () =>
  createSelector(selectHomePageDomain, substate => substate.get('academicYearList'));

const makeSelectGlobalSectionList = () =>
  createSelector(selectHomePageDomain, substate => substate.get('sectionList'));

const makeSelectHomeSliderList = () =>
  createSelector(selectHomePageDomain, substate => substate.get('homeSliderList'));

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
  makeSelectEmAccessToken,
  makeSelectMenuList,
  makeSelectLatestNewsList,
  makeSelectNoticeList,
  makeSelectWelcomeSpeech,
  makeSelectUseFullLinks,
  makeSelectHistoryDetails,
  makeSelectTopEvents,
  makeSelectAcademicYearList,
  makeSelectGlobalSectionList,
  makeSelectHomeSliderList
};
