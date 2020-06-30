import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectAcademicYear } from './selectors';
import { SUBMIT_SEARCH_BUTTON, SET_ACADEMIC_YEAR, SET_EXAM_LIST, SET_ACADEMIC_YEAR_LIST } from './constants';
import {  fetch_examListBy_classConfigID, BASE_URL_EM, fetch_coreSettingsListBy_typeId  } from '../../utils/serviceUrl';
import { makeSelectAccessToken } from '../Header/selectors';
import { setAcademicYearList } from './actions';


// Individual exports for testing

export function* fetch_SectionListByAcademicYear() {

  console.log('academic-year in merit list', yield select(makeSelectAcademicYear()));

}

export function* fetch_meritList() {

  console.log('saga-merit-list-search-btn-called');

}

export function* fetch_examList() {
  let emToken = JSON.parse(localStorage.getItem('emToken'));

  // let instituteUrlInfo = yield select(makeSelectInstituteUrlInfo());
  // let instituteID = instituteUrlInfo.coreUrlMappingDTOs[0].edumanDetailsInfoDTO.instituteId;
  let instituteID = '10012';
  let classConfigId = '100155';
  console.log('instituteUrlInfo',instituteUrlInfo.coreUrlMappingDTOs[0].edumanDetailsInfoDTO.instituteId);
  const requestURL = BASE_URL_EM.concat(fetch_examListBy_classConfigID).concat('?classConfigId=').concat(classConfigId).concat('&instituteId=').concat(instituteID);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,

    },
  };
  const response = yield call(request, requestURL, options);
  console.log('xm list response', response);
  // try {
  //   yield put(setSectionList(response.item));
  //   } catch (error) { }
  };


  export function* fetch_AcademicYearList() {
    console.log("saga");
    let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
    let emToken = JSON.parse(localStorage.getItem('emToken'));

  
    // let instituteID =  instituteUrlInfo && instituteUrlInfo.coreUrlMappingDTOs && instituteUrlInfo.coreUrlMappingDTOs[0] && instituteUrlInfo.coreUrlMappingDTOs[0].edumanDetailsInfoDTO && instituteUrlInfo.coreUrlMappingDTOs[0].edumanDetailsInfoDTO.instituteId;
    const requestURL = BASE_URL_EM.concat(fetch_coreSettingsListBy_typeId).concat('?typeId=').concat('2101').concat('&instituteId=').concat('10012');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + emToken.access_token,
  
      },
    };
    try {
      const response = yield call(request, requestURL, options);
      console.log('ac-year merit list', response);
  
      yield put(setAcademicYearList(response.item));
    } catch (error) { }
    }; 

export default function* meritListSaga() {
  yield fetch_AcademicYearList();
  // See example in containers/HomePage/saga.js
  // yield fetch_examList();
  yield takeLatest(SET_ACADEMIC_YEAR, fetch_SectionListByAcademicYear);
  // yield takeLatest(SUBMIT_SEARCH_BUTTON, fetch_meritList);


}
