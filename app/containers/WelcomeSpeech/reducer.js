/*
 *
 * WelcomeSpeech reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_WELCOME_SPEECH_LIST } from './constants';

export const initialState = fromJS({});

function welcomeSpeechReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_WELCOME_SPEECH_LIST:
        return state.set('speechList', action.speechList);
    default:
      return state;
  }
}

export default welcomeSpeechReducer;
