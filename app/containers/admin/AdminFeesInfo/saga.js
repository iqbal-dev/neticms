import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import {
  makeSelectAdminToken
} from '../../AdminLogin/selectors';

import {
  getFeesInfoListData
} from './actions';

import {
  fetch_feesInfoList, BASE_URL_NETI_CMS

} from '../../../utils/serviceUrl';

// Individual exports for testing

export function* get_feesInfoListData() {

  // let adminToken = yield select(makeSelectAdminToken());
  console.log(JSON.parse(localStorage.instituteInfo));
  let adminToken = JSON.parse(localStorage.adminToken);

  console.log('adminToken', adminToken);

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_feesInfoList);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + adminToken.access_token,
    },
  };
  try {
    const response = yield call(request, requestURL, options);
    console.log('fees info list', response);
    // yield put(getFeesInfoListData(response.item));
  } catch (error) { }
};

export default function* adminFeesInfoSaga() {
  yield get_feesInfoListData();
}
