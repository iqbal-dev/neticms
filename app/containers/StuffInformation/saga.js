import { take, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import { BASE_URL, fetch_staffsInformaions, BASE_URL_EM } from '../../utils/serviceUrl';
import { getMethod } from '../../utils/baseMethod';

import { setStaffInfoList } from './actions';
import { setUrlInfoLocally } from '../../utils/localStorageMethod';
import { setUrlId } from '../HomePage/actions';
import { makeSelectAccessToken } from '../Header/selectors';

export function* fetchStuffsInfoList() {

  const token = yield select(makeSelectAccessToken());
  console.log('token.access_token', token.access_token);
  
  // const requestURL = '3.211.144.191:8080/nw/sa-point/basic/list/by/category/with/photo?categoryName=Teacher&instituteId=10060'
  const requestURL = BASE_URL_EM.concat(fetch_staffsInformaions).concat('?categoryName=').concat("Teacher").concat('&instituteId=').concat("10060");
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' +token.access_token,
    },
  };
  const response = yield call(request, requestURL, options);
  console.log('staff-infom-response', response);
  try {
    yield put(setStaffInfoList());
  } catch (error) {
    console.log('error-res', error);
    
   }

}
// Individual exports for testing
export default function* stuffInformationSaga() {
  yield fetchStuffsInfoList();
}
