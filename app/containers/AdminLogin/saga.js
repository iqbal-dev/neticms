import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { BASE_URL_NETI_CMS, login_URL } from '../../utils/serviceUrl';

import { makeSelectUserName, makeSelectPassword } from './selectors';
import { SUBMIT_LOGIN } from './constants';
import { setAdminToken, setAuthStatus } from './actions';

import { Redirect, Link } from "react-router-dom";
import { setAuthenticatedStatus } from '../../utils/localStorageMethod';

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

    setAuthenticatedStatus(true);
    localStorage.setItem('adminToken', JSON.stringify(response));

    yield put(setAuthStatus(true));
    yield put(setAdminToken(response));


  } catch (error) { }

}
// Individual exports for testing
export default function* adminLoginSaga() {

  yield takeLatest(SUBMIT_LOGIN, submitLoginHandle);

}
