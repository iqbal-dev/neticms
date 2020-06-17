import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the header state domain
 */

const selectHeaderDomain = state => state.get('header', initialState);

/**
 * Other specific selectors
 */
const makeSelectInstituteUrlInfo = () =>
createSelector(selectHeaderDomain, substate => substate.get('urlInfo'));

const makeSelectMenuList = () =>
createSelector(selectHeaderDomain, substate => substate.get('menuList'));

const makeSelectLatestNewsList = () =>
createSelector(selectHeaderDomain, substate => substate.get('newsList'));

const makeSelectWelcomeSpeech = () =>
createSelector(selectHeaderDomain, substate => substate.get('welcomeSpeech'));

const makeSelectNoticeList = () =>
createSelector(selectHeaderDomain, substate => substate.get('noticeList'));

const makeSelectHistoryDetails = () =>
createSelector(selectHeaderDomain, substate => substate.get('historyDetails'));

const makeSelectTopEvents = () =>
createSelector(selectHeaderDomain, substate => substate.get('topEvents'));

// const makeSelectUrld = () =>
// createSelector(selectHeaderDomain, substate => substate.get('urlId'));
/**
 * Default selector used by Header
 */

const makeSelectHeader = () =>
  createSelector(selectHeaderDomain, substate => substate.toJS());

export default makeSelectHeader;
export {
   selectHeaderDomain,
   makeSelectInstituteUrlInfo,
  //  makeSelectUrld,
  makeSelectMenuList,
  makeSelectLatestNewsList,
  makeSelectWelcomeSpeech,
  makeSelectNoticeList,
  makeSelectHistoryDetails,
  makeSelectTopEvents,
};
