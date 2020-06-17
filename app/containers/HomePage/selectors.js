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


  const makeSelectLoaderStatus = () =>
  createSelector(selectHomePageDomain, substate => substate.get('loadingStatus'));
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

};
