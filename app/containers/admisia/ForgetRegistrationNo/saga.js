import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import { BASE_URL_NETI_CMS, FETCH_APPLICANT_PERSONAL_INFO_BY_MOBILE } from '../../../utils/serviceUrl';

import { SUBMIT_SEARCH } from './constants';
import { setApplicantInfoDetails, setLoader } from './actions';
import { makeSelectMobileNo } from './selectors';

export function* fetchApplicantInfoByMobileNo() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  const cmsId = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;
  const mobileNo = yield select(makeSelectMobileNo());

  yield put(setLoader('tableLoadOn'));
  const requestURL = BASE_URL_NETI_CMS.concat(FETCH_APPLICANT_PERSONAL_INFO_BY_MOBILE).concat('?cmsId=').concat(cmsId).concat('&mobileNo=').concat(mobileNo);
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', },
  };
  try {
    const response = yield call(request, requestURL, options);
    console.log('list-by-regId', response);
    yield put(setLoader('tableLoadOff'));
    if (response.messageType === 1) {
      yield put(setApplicantInfoDetails(response.item));
    } else { setApplicantInfoDetails([]) }

  } catch (error) { }

}

export default function* paymentSaga() {
  yield takeLatest(SUBMIT_SEARCH, fetchApplicantInfoByMobileNo);
}
