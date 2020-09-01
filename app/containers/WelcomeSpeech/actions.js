/*
 *
 * WelcomeSpeech actions
 *
 */

import { DEFAULT_ACTION, SET_WELCOME_SPEECH_LIST, SET_LOADER } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setWelcomeSpeechList(speechList) {
  return {
    type: SET_WELCOME_SPEECH_LIST,
    speechList,
  };
}

export function setLoader(loaderType) {
  return { type: SET_LOADER, loaderType, };
}