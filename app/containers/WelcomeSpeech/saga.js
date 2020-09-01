// import { take, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import {
  BASE_URL_NETI_CMS, fetch_welcomeSpeechList
} from '../../utils/serviceUrl';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { setWelcomeSpeechList, setLoader } from './actions';

export function* fetch_welcomeSpeechDetails() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsID = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;

  yield put(setLoader('autoLoadOn'));
  const requestURL = BASE_URL_NETI_CMS.concat(fetch_welcomeSpeechList).concat('?cmsId=').concat(cmsID);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  const response = yield call(request, requestURL, options);
  yield put(setLoader('autoLoadOff'));

  try {
    console.log('welcome speech response', response);
    yield put(setWelcomeSpeechList(response.item));
  } catch (error) { }

}

export default function* welcomeSpeechSaga() {
  yield fetch_welcomeSpeechDetails();
}
