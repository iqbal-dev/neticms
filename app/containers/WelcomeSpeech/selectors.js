import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the welcomeSpeech state domain
 */

const selectWelcomeSpeechDomain = state =>
  state.get('welcomeSpeech', initialState);

const makeSelectWelcomeSpeechList = () =>
  createSelector(selectWelcomeSpeechDomain, substate => substate.get('speechList'));

const makeSelectWelcomeSpeechLoader = () =>
  createSelector(selectWelcomeSpeechDomain, substate => substate.get('loaderType'));

/**
 * Other specific selectors
 */

/**
 * Default selector used by WelcomeSpeech
 */

const makeSelectWelcomeSpeech = () =>
  createSelector(selectWelcomeSpeechDomain, substate => substate.toJS());

export default makeSelectWelcomeSpeech;
export { selectWelcomeSpeechDomain, makeSelectWelcomeSpeechList, makeSelectWelcomeSpeechLoader };
