import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the welcomeSpeech state domain
 */

const selectWelcomeSpeechDomain = state =>
  state.get('welcomeSpeech', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by WelcomeSpeech
 */

const makeSelectWelcomeSpeech = () =>
  createSelector(selectWelcomeSpeechDomain, substate => substate.toJS());

export default makeSelectWelcomeSpeech;
export { selectWelcomeSpeechDomain };
