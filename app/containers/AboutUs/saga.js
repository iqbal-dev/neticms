import { take, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import { fetch_urlMappingInfoBy_urlName, fetch_menu_urlName, fetch_welcomeSpeechBy_urlId, fetch_noticeBy_urlId, fetch_about_historyBy_urlId, fetch_instituteHistoryBy_urlId, BASE_URL_NETI_CMS } from '../../utils/serviceUrl';
// import { getMethod } from '../../utils/baseMethod';

import { setInstituteUrlInfo, setUrlInfo, setWelcomeSpeech, setNotice, setAboutHistory } from './actions';
import { getUrlInfoLocally } from '../../utils/localStorageMethod';

export function* fetch_aboutHistory_byUrlId() {

  const urlInfo = JSON.parse(getUrlInfoLocally());
  // console.log('about-pageget-UrlInfoLocally', urlInfo);

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_instituteHistoryBy_urlId).concat('?type=').concat('History').concat('&urlid=').concat(urlInfo.urlInfoID);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  // console.log('about-history response', response[0]);
  try {
    yield put(setAboutHistory(response[0]));
  } catch (error) { }

}

export default function* aboutUsSaga() {
  yield fetch_aboutHistory_byUrlId();
}
