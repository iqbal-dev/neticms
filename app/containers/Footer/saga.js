import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';

import { makeSelectInstituteUrlInfo } from "../Header/selectors";
import { SUBMIT_CONTACT } from './constants';
import {
  makeSelectName,
  makeSelectMobileNo,
  makeSelectEmail,
  makeSelectMessageDetails,
} from './selectors';
import { fetch_noticeBy_urlId, BASE_URL_NETI_CMS, } from '../../utils/serviceUrl';

export function* submit_Contact_Form() {

  let urlInfoId = yield select(makeSelectInstituteUrlInfo());
  console.log('footer-contact-submit', urlInfoId);

  let requestedObj = {
    name: yield select(makeSelectName()),
    mobileNo: yield select(makeSelectMobileNo()),
    email: yield select(makeSelectEmail()),
    message: yield select(makeSelectMessageDetails()),
  }

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_noticeBy_urlId);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestedObj)
  };
  const response = yield call(request, requestURL, options);
  // console.log('submit response', response);
  try {
    console.log('submit-footer-contact', response);

  } catch (error) { }

}

export default function* footerSaga() {
  yield takeLatest(SUBMIT_CONTACT, submit_Contact_Form);
}
