import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { makeSelectStudentID, makeSelectStudentMobile, makeSelectAcademicYear, makeSelectExamConfigId } from "./selectors";
import { SUBMIT_SEARCH_BUTTON, SET_ON_CHANGE_ACADEMIC_YEAR } from "./constants";
import { 
  BASE_URL_EM, 
  fetch_coreSettingsListBy_typeId, 
  fetch_examListBy_studentID_and_year, 
  fetch_individual_result_data 
} from '../../utils/serviceUrl';
import request from '../../utils/request';
import { setAcademicYearList, setExamList, setIndividualResultData } from './actions';

function emCommonRequestOptions(){
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let emToken = JSON.parse(localStorage.getItem('emToken'));

  let instituteId = '';
  instituteUrlInfo && instituteUrlInfo.length ? 
    instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId 

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };
  return {
    instituteId: instituteId,
    options: options
  }
}

export function* fetch_AcademicYearList() {
  const requestOptions = emCommonRequestOptions();

  let instituteID = '10020';
  const requestURL = BASE_URL_EM.concat(fetch_coreSettingsListBy_typeId).concat('?typeId=').concat('2101').concat('&instituteId=').concat(instituteID);
  
  try {
    const response = yield call(request, requestURL, requestOptions.options);
    console.log('ac_year', response);

    yield put(setAcademicYearList(response.item));
  } catch (error) { }

};

export function* fetch_examListBy_Type() {
  const requestOptions = emCommonRequestOptions();

  let stdID = yield select(makeSelectStudentID());
  let academicYear = yield select(makeSelectAcademicYear());

  let instituteID = '10199';
  const requestURL = BASE_URL_EM.concat(fetch_examListBy_studentID_and_year) + '?customStudentId=' + stdID + '&academicYear=' + academicYear + '&instituteId='+ instituteID;
  
  const response = yield call(request, requestURL, requestOptions.options);
  // console.log('exam_list', response);
  yield put(setExamList(response.item));

}

export function* fetch_individual_result() {
  const requestOptions = emCommonRequestOptions();
  console.log("CLICK");
  let stdID = yield select(makeSelectStudentID());
  let stdMobile = yield select(makeSelectStudentMobile());
  let academicYear = yield select(makeSelectAcademicYear());
  let examConfigId = yield select(makeSelectExamConfigId());

  console.log("CLICK stdID", stdID, stdMobile, academicYear, examConfigId);
  
  const requestURL = BASE_URL_EM.concat(fetch_individual_result_data) + '?customStudentId=' + stdID + '&academicYear=' + academicYear + '&examId=' + examConfigId + '&instituteId=10199'
  
  const response = yield call(request, requestURL, requestOptions.options);
  console.log('Result Response>>>>>>>>>>>>>>>>', response);
  try {
    yield put(setIndividualResultData(response));
  } catch (error) { }

}

// Individual exports for testing
export default function* individualResultSaga() {
  // See example in containers/HomePage/saga.js
  yield fetch_AcademicYearList();
  yield takeLatest(SET_ON_CHANGE_ACADEMIC_YEAR, fetch_examListBy_Type);
  yield takeLatest(SUBMIT_SEARCH_BUTTON, fetch_individual_result)
  // yield call(fetch_PaySlipList)
}
