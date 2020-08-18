import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  BASE_URL_NETI_CMS,
  fetch_downloadLinksBy_cmsId,
  BASE_URL_EM,
  fetch_downloadFileContent
} from '../../utils/serviceUrl';
import request from '../../utils/request';
import {
  downloadLinksLists,
  getDownloadFile
} from './actions';
import { SET_DOWNLOAD_ITEM } from './constants';
import { makeSelectDownloadItem } from './selectors'

function emCommonRequestOptions() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let emToken = JSON.parse(localStorage.getItem('emToken'));

  let instituteId = '';
  instituteUrlInfo && instituteUrlInfo.length ?
    instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };
  return {
    instituteId: instituteId,
    options: options
  }
}

export function* fetch_downloadLinksList() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsId = instituteUrlInfo[0].cmsId;

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_downloadLinksBy_cmsId).concat('?cmsId=') + cmsId;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = yield call(request, requestURL, options);
    // console.log('response.item', response.item);
    yield put(downloadLinksLists(response.item));

  } catch (error) {

  }

}

export function* fetch_downloadItem() {

  let downloadItem = yield select(makeSelectDownloadItem());
  yield put(getDownloadFile(''));

  const requestOptions = emCommonRequestOptions();
  const requestURL = BASE_URL_NETI_CMS.concat(fetch_downloadFileContent).concat('?fileId=') + downloadItem.fileId

  try {
    const response = yield call(request, requestURL, requestOptions.options);
    // console.log('Download Content', response);
    yield put(getDownloadFile(response.file));
  } catch (error) { }

}

// Individual exports for testing
export default function* downloadCornerSaga() {
  yield fetch_downloadLinksList();
  yield takeLatest(SET_DOWNLOAD_ITEM, fetch_downloadItem);
}
