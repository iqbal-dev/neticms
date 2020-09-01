import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { BASE_URL_NETI_CMS, fetch_classListBy_cmsId, fetch_bookListBy_classId } from '../../utils/serviceUrl';
import request from '../../utils/request';
import { fetchClassList, fetchBookList, setLoader } from './actions';
import { makeSelectBookListByClassId } from './selectors';
import { FETCH_BOOK_LIST_BY_CLASS_ID } from './constants';

export function* fetch_AllClassList() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

  let cmsId = instituteUrlInfo[0].cmsId;
  const requestURL = BASE_URL_NETI_CMS.concat(fetch_classListBy_cmsId).concat('?cmsId=').concat(cmsId);

  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', },
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(fetchClassList(response.item));
  } catch (error) { }
}

export function* fetch_booklistByClassId() {

  let classID = yield select(makeSelectBookListByClassId());
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

  let cmsId = instituteUrlInfo[0].cmsId;
  const requestURL = BASE_URL_NETI_CMS.concat(fetch_bookListBy_classId).concat('?classId=').concat(classID).concat('&cmsId=').concat(cmsId);
  yield put(setLoader('autoLoadOn'));

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {

    const response = yield call(request, requestURL, options);
    yield put(setLoader('autoLoadOff'));
    console.log('response.item', response.item);
    yield put(fetchBookList(response.item));

  } catch (error) {

  }
}

export default function* bookListSaga() {
  yield fetch_AllClassList();
  yield takeLatest(FETCH_BOOK_LIST_BY_CLASS_ID, fetch_booklistByClassId);
}
