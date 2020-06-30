import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { setDressCodeList } from './actions';
import {  fetch_urlMappingInfoBy_urlName, BASE_URL_NETI_CMS } from '../../utils/serviceUrl';
import request from '../../utils/request';

export function* fetchDressCodeList() {

  console.log('fetchDressCodeList -saga');
  let instituteHostNm = '';
  const requestURL = BASE_URL_NETI_CMS.concat(fetch_urlMappingInfoBy_urlName).concat('?urlName=').concat(instituteHostNm);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': tokenData.token_type + " " + tokenData.access_token,
    },
  };
  const response = yield call(request, requestURL, options);

  let dressCodeList = [
    { key: 1, value: 'code 1' },
    { key: 2, value: 'code 2' },

  ]
  yield put(setDressCodeList(response.dressCodeList));
}

// Individual exports for testing
export default function* dressCodeSaga() {
  // See example in containers/HomePage/saga.js

  // yield takeLatest(SUBMIT_BUTTON, fetchDressCodeList);
  yield fetchDressCodeList();

}
