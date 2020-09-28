import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';

import {
  BASE_URL_NETI_CMS, fetch_seats_details
} from '../../utils/serviceUrl';
import { setSeatInfoList, setLoader } from './actions';

// Individual exports for testing
export function* fetch_seatInfo_List() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsID = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;
  // console.log('seat cmsID',cmsID);
  yield put(setLoader('tableLoadOn'));

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_seats_details).concat('?cmsId=').concat(cmsID);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'

    },
  };
  const response = yield call(request, requestURL, options);
  try {
    // console.log('seat response', response);
    yield put(setLoader('tableLoadOff'));
    yield put(setSeatInfoList(response.item));
  } catch (error) { }

}
export default function* seatInfoSaga() {
  yield fetch_seatInfo_List();
}
