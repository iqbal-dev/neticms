import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectAcademicYear } from './selectors';
import { SUBMIT_SEARCH_BUTTON, SET_ACADEMIC_YEAR, SET_EXAM_LIST } from './constants';
import {  fetch_examListBy_classConfigID, BASE_URL_EM  } from '../../utils/serviceUrl';
import { makeSelectAccessToken } from '../Header/selectors';

// Individual exports for testing

export function* fetch_SectionListByAcademicYear() {

  console.log('academic-year in merit list', yield select(makeSelectAcademicYear()));

}

export function* fetch_meritList() {

  console.log('saga-merit-list-search-btn-called');

}

export function* fetch_examList() {
  let token = yield select(makeSelectAccessToken());
  // let instituteUrlInfo = yield select(makeSelectInstituteUrlInfo());
  // let instituteID = instituteUrlInfo.coreUrlMappingDTOs[0].edumanDetailsInfoDTO.instituteId;
  console.log("token in merit list saga", token)
  let instituteID = '10012';
  let classConfigId = '100155';
  console.log('instituteUrlInfo',instituteUrlInfo.coreUrlMappingDTOs[0].edumanDetailsInfoDTO.instituteId);
  const requestURL = BASE_URL_EM.concat(fetch_examListBy_classConfigID).concat('?classConfigId=').concat(classConfigId).concat('&instituteId=').concat(instituteID);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.access_token,

    },
  };
  const response = yield call(request, requestURL, options);
  console.log('xm list response', response);
  // try {
  //   yield put(setSectionList(response.item));
  //   } catch (error) { }
  };

export default function* meritListSaga() {
  // See example in containers/HomePage/saga.js
  yield fetch_examList();
  yield takeLatest(SET_ACADEMIC_YEAR, fetch_SectionListByAcademicYear);
  yield takeLatest(SUBMIT_SEARCH_BUTTON, fetch_meritList);


}
