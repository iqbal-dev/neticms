import { take, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import { BASE_URL, fetch_staffsInformaions, BASE_URL_EM } from '../../utils/serviceUrl';
import { getMethod, getMethodWithAuth } from '../../utils/baseMethod';

import { setStaffInfoList } from './actions';
import { makeSelectAccessToken } from '../Header/selectors';

export function* fetch_stuffsInfoList() {

  const token = yield select(makeSelectAccessToken());
  const requestURL = BASE_URL_EM.concat(fetch_staffsInformaions).concat('?categoryName=').concat("Staff").concat('&instituteId=').concat("10060");
  const options =     {
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

export default function* stuffInformationSaga() {
  yield fetch_stuffsInfoList();
}
