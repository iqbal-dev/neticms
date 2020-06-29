import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { BASE_URL, fetch_staffsInformaions, BASE_URL_EM } from '../../utils/serviceUrl';
import { getMethod, getMethodWithAuth } from '../../utils/baseMethod';
import { STUFF_SEARCH_BUTTON } from './constants'
import { setStaffInfoList } from './actions';
import { makeSelectStuffRowData } from './selectors'
import { makeSelectAccessToken } from '../HomePage/selectors';

export function* fetch_stuffsInfoList() {

  const token = yield select(makeSelectAccessToken());
  console.log('token-stuffInfo', token);

  const requestURL = BASE_URL_EM.concat(fetch_staffsInformaions).concat('?categoryName=').concat("Staff").concat('&instituteId=').concat("10060");
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token
    }
  }
  // getMethodWithAuth(token.access_token);
  const response = yield call(request, requestURL, options);

  try {
    console.log('staff-information-response', response);

    yield put(setStaffInfoList(response.item));
  } catch (error) { console.log('error-res', error); }

}

export function* fetch_stuffsInfoBySearch() {

  console.log("search function clicked");
  let rowData = yield select(makeSelectStuffRowData());

  console.log("rowData clicked", rowData);

}

export default function* stuffInformationSaga() {
  yield fetch_stuffsInfoList();
  // yield takeLatest(STUFF_SEARCH_BUTTON, fetch_stuffsInfoBySearch);

}
