import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { BASE_URL_NETI_CMS, login_URL } from '../../utils/serviceUrl';

import { makeSelectUserName, makeSelectPassword } from './selectors';
import { SUBMIT_LOGIN } from './constants';
import { setAdminToken } from './actions';

import { Redirect } from "react-router-dom";

export function* submitLoginHandle() {

  let username = yield select(makeSelectUserName());
  let password = yield select(makeSelectPassword());
  console.log('userName , password', username, password);

  const authorizationValue = 'Y21zLXdlYi1yZWFkLXdyaXRlLWNsaWVudDpjbXMtd2ViLXJlYWQtd3JpdGUtY2xpZW50MTIzNA==';
  const body = {
    client_id: 'cms-web-read-write-client',
    grant_type: 'password',
    username,
    password,
  };

  const formBody = Object.keys(body).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`).join('&');
  const requestURL = BASE_URL_NETI_CMS.concat(login_URL);
  const options = {
    method: 'POST',
    headers: {
      authorization: `Basic ${authorizationValue}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  };
  try {
    const response = yield call(request, requestURL, options);
    console.log('login-res', response);
    if (response) {
      yield put(setAdminToken(response));
      let pathNm = "/admin_homepage";
      <Redirect to={pathNm} />
    }
  } catch (error) { }

}
// Individual exports for testing
export default function* adminLoginSaga() {

  yield takeLatest(SUBMIT_LOGIN, submitLoginHandle);

}
