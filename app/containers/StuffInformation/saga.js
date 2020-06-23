import { take, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import { BASE_URL, fetch_staffsInformaions } from '../../utils/serviceUrl';
import { getMethod } from '../../utils/baseMethod';

import { setStaffInfoList } from './actions';
import { setUrlInfoLocally } from '../../utils/localStorageMethod';
import { setUrlId } from '../HomePage/actions';

export function* fetchStuffsInfoList() {

  const requestURL = '3.211.144.191:8080/nw/sa-point/basic/list/by/category/with/photo?categoryName=Teacher&instituteId=10060'
  // const requestURL = BASE_URL.concat(fetch_staffsInformaions).concat('?categoryName=').concat("Teacher").concat('&instituteId=').concat("10060");
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer 5163442e-8966-4d5c-b1e6-008990537346'
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
