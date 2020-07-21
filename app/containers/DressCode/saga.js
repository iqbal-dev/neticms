import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { setDressCodeList, setMaleDressCodeList, setFemaleDressCodeList, setCombinedDressCodeList } from './actions';
import {  fetch_genderWise_dressList, BASE_URL_NETI_CMS } from '../../utils/serviceUrl';
import request from '../../utils/request';

export function* fetch_maleDressCode_List() {
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsID = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;
  console.log('male dresscode cmsID',cmsID);

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_genderWise_dressList).concat('?gender=').concat('Male').concat('&cmsId=').concat(cmsID);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'

    },
  };
  const response = yield call(request, requestURL, options);
  try {
    console.log('male dresscode response',response);
    yield put(setMaleDressCodeList(response.item));

  } catch (error) { }

}

export function* fetch_femaleDressCode_List() {
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsID = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_genderWise_dressList).concat('?gender=').concat('Female').concat('&cmsId=').concat(cmsID);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'

    },
  };
  const response = yield call(request, requestURL, options);
  try {
    console.log('female dresscode response',response);
    yield put(setFemaleDressCodeList(response.item));

  } catch (error) { }

}

export function* fetch_combineDressCode_List() {
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsID = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_genderWise_dressList).concat('?gender=').concat('Combine').concat('&cmsId=').concat(cmsID);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'

    },
  };
  const response = yield call(request, requestURL, options);
  try {
    console.log('female dresscode response',response);
    yield put(setCombinedDressCodeList(response.item));

  } catch (error) { }

}

// Individual exports for testing
export default function* dressCodeSaga() {
  // See example in containers/HomePage/saga.js

  // yield takeLatest(SUBMIT_BUTTON, fetchDressCodeList);
  yield fetch_maleDressCode_List();
  yield fetch_femaleDressCode_List();
  yield fetch_combineDressCode_List();



}
