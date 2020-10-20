import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import { BASE_URL_NETI_CMS, insert_applicant_info } from '../../../utils/serviceUrl';
import { SET_ON_SUBMIT_INSERT_APPLICANT_INFO } from './constants';
import { makeSelectInsertApplicantInfo } from './selectors';


export function* submitApplicantInfo() {

  let insertApplicantInfo = yield select(makeSelectInsertApplicantInfo());
  console.log("INSERT OBJ", insertApplicantInfo);

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsID = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;
  
  const requestURL = BASE_URL_NETI_CMS.concat(insert_applicant_info);
  // const requestURLforAdmissionYear = BASE_URL_NETI_CMS.concat(fetch_coreConfigListBy_cmsId).concat('?cmsId=').concat(cmsID);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(insertApplicantInfo)
  };

  // yield put(setDataTableLoader(true));

  const response = yield call(request, requestURL, options);
  try {
    console.log('submit-footer-contact', response);

  } catch (error) { }
  
}

// Individual exports for testing
export default function* applicationFormSaga() {
  yield takeLatest(SET_ON_SUBMIT_INSERT_APPLICANT_INFO, submitApplicantInfo)
}
