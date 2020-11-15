import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import {
  BASE_URL_NETI_CMS,
  insert_applicant_info,
  FETCH_APPLICANT_INFO_DETAILS_BY_REG_ID,
} from '../../../utils/serviceUrl';

import { SET_ON_SUBMIT_INSERT_APPLICANT_INFO } from './constants';
import {
  setApplicantInfoListByRegId,
  setMessage
} from './actions';
import { makeSelectInsertApplicantInfo } from './selectors';

export function* submitApplicantInfo() {

  let insertApplicantInfo = yield select(makeSelectInsertApplicantInfo());
  // console.log("INSERT OBJ", insertApplicantInfo);

  const requestURL = BASE_URL_NETI_CMS.concat(insert_applicant_info);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(insertApplicantInfo)
  };

  try {
    const response = yield call(request, requestURL, options);
    // console.log('SUBMIT::::', response);
    yield put(setMessage(response));
    if (response.messageType === 1) {
      yield fetch_applicantInfoDetailsByRegId(response.item);
    }
  } catch (error) { }

}

export function* fetch_applicantInfoDetailsByRegId(registrationId) {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsId = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;

  const requestURL = BASE_URL_NETI_CMS.concat(FETCH_APPLICANT_INFO_DETAILS_BY_REG_ID).concat('?registrationId=').concat(registrationId).concat('&cmsId=').concat(cmsId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = yield call(request, requestURL, options);
    // console.log('list-by-regId', response);
    if (response.messageType === 1) {
      yield put(setApplicantInfoListByRegId(response.item.applicantPersonalViewResponse));
    }

  } catch (error) { }
}

export default function* applicationFormSaga() {
  yield takeLatest(SET_ON_SUBMIT_INSERT_APPLICANT_INFO, submitApplicantInfo)
}
