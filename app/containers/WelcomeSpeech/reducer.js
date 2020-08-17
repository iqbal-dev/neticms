/*
 *
 * WelcomeSpeech reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_WELCOME_SPEECH_LIST, SET_LOADER } from './constants';

export const initialState = fromJS({});

function welcomeSpeechReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_WELCOME_SPEECH_LIST:
      return state.set('speechList', action.speechList);

    case SET_LOADER:
      return state.set('loaderType', action.loaderType);

    default:
      return state;
  }
}

export default welcomeSpeechReducer;
