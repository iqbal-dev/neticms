import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import {BASE_URL_NETI_CMS,fetch_public_classList, fetch_feesInfoBy_class
 
} from '../../utils/serviceUrl';
import { setClassList, setFeesInfoList } from './actions';
import { SUBMIT_SEARCH_BUTTON } from './constants';
import { makeSelectOnchangeClassValue } from './selectors';


export function* fetch_class_List() {
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsID = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_public_classList).concat('?cmsId=').concat(cmsID);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'

    },
  };
  const response = yield call(request, requestURL, options);
  try {
    console.log('class response',response);
    yield put(setClassList(response.item));
  } catch (error) { }

}

export function* fetch_classWiseFeesInfo() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsID = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;
  let classID = yield select(makeSelectOnchangeClassValue());

  
  const requestURL = BASE_URL_NETI_CMS.concat(fetch_feesInfoBy_class).concat('?classId=').concat(classID).concat('&cmsId=').concat(cmsID);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = yield call(request, requestURL, options);
  console.log('section wise result Res', response);
  try {
    yield put(setFeesInfoList(response.item));
  } catch (error) { }

}

// Individual exports for testing
export default function* feesInfoSaga() {
  yield fetch_class_List();
  yield takeLatest(SUBMIT_SEARCH_BUTTON, fetch_classWiseFeesInfo);
}
