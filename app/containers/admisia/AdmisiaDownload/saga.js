import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import { FETCH_APPLICANT_PERSONAL_INFO_BY_REG_ID, BASE_URL_NETI_CMS } from '../../../utils/serviceUrl';

import { SUBMIT_SEARCH } from './constants';
import { setApplicantInfoDetails } from './actions';
import { makeSelectRegistrationNo } from './selectors';

export function* fetchApplicantInfoByRegNo() {

  const regNo = yield select(makeSelectRegistrationNo());
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsId = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;

  const requestURL = BASE_URL_NETI_CMS.concat(FETCH_APPLICANT_PERSONAL_INFO_BY_REG_ID).concat('?registrationId=').concat(regNo).concat('&cmsId=').concat(cmsId);
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', },
  };
  try {
    const response = yield call(request, requestURL, options);
    console.log('list-by-regId', response);
    if (response.messageType === 1) {
      yield put(setApplicantInfoDetails(response.item));
    } else { yield put(setApplicantInfoDetails([])) }

  } catch (error) { }

}

export default function* paymentSaga() {
  yield takeLatest(SUBMIT_SEARCH, fetchApplicantInfoByRegNo);
}
