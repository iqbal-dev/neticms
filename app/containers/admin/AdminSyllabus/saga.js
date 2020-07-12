import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  BASE_URL_NETI_CMS,
  fetch_classList,
  fetch_groupList,
  fetch_syllabusInfoList,
} from '../../../utils/serviceUrl';
import request from '../../../utils/request';
import { setClassList, setSyllabusInfoList, setGroupList } from './actions';
import { adminRequestOptions } from '../../../utils/adminRequestOptions';

export function* fetch_syllabusList() {

  const requestURL = BASE_URL_NETI_CMS + fetch_syllabusInfoList;
  const requestOptions = adminRequestOptions();

  try {
    const response = yield call(request, requestURL, requestOptions.GET);
    console.log('Syllabusinfo list', response);
    yield put(setSyllabusInfoList(response.item));
  } catch (error) { }

}

export function* fetch_classListData() {

  const requestURL = BASE_URL_NETI_CMS + fetch_classList;
  const requestOptions = adminRequestOptions();
  try {
    const response = yield call(request, requestURL, requestOptions.GET);
    console.log('CLASS info list', response);
    yield put(setClassList(response.item));
  } catch (error) { }

};

export function* fetch_groupListData() {

  const requestURL = BASE_URL_NETI_CMS + fetch_groupList;
  const requestOptions = adminRequestOptions();

  try {
    const response = yield call(request, requestURL, requestOptions.GET);
    console.log('GROUP info list', response);
    yield put(setGroupList(response.item));
  } catch (error) { }
};

// Individual exports for testing
export default function* adminSyllabusSaga() {
  yield fetch_syllabusList();
  yield fetch_classListData();
  yield fetch_groupListData()
}
