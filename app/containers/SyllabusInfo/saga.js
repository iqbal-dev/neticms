import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { BASE_URL_NETI_CMS, fetch_syllabusBy_cmsId, fetch_syllabusFileBy_cmsId } from '../../utils/serviceUrl';
import request from '../../utils/request';
import { fetchSyllabusList, setSyllabusFile } from './actions';
import { makeSelectSyllabusRowdata } from './selectors';
import { SUBMIT_FETCH_FILE } from './constants';

export function* fetch_AllSyllabus() {
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

  let cmsId = instituteUrlInfo[0].cmsId;
  const requestURL = BASE_URL_NETI_CMS.concat(fetch_syllabusBy_cmsId).concat('?cmsId=').concat(cmsId);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = yield call(request, requestURL, options);
    console.log('response.item', response.item);
    yield put(fetchSyllabusList(response.item));

  } catch (error) {

  }

}

export function* fetch_SyllabusFile() {

  let selectedRowdata = yield select(makeSelectSyllabusRowdata());
  const requestURL = BASE_URL_NETI_CMS.concat(fetch_syllabusFileBy_cmsId).concat('?syllabusId=').concat(selectedRowdata.syllabusId);
  console.log('requestURL', requestURL);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = yield call(request, requestURL, options);
    console.log('setSyllabusFile-response', response.item);
    yield put(setSyllabusFile(response.item));

  } catch (error) {

  }

}

// Individual exports for testing
export default function* syllabusInfoSaga() {
  yield fetch_AllSyllabus();
  yield takeLatest(SUBMIT_FETCH_FILE, fetch_SyllabusFile);
}
