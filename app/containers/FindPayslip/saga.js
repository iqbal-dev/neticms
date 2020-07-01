import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { 
  fetch_coreSettingsListBy_typeId, 
  BASE_URL_EM, 
  fetch_sectionWiseFailList, 
  fetch_student_paySlipList 
} from '../../utils/serviceUrl';
import { 
  setAcademicYearList, 
  setPaySlipListData 
} from './actions';
import request from '../../utils/request';
import { 
  makeSelectAcademicYear,
  makeSelectStudentID,
} from './selectors';
import { SUBMIT_SEARCH_BUTTON } from './constants';

export function* fetch_AcademicYearList() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let token = JSON.parse(localStorage.getItem('emToken'));

  let instituteID = '10020';
  const requestURL = BASE_URL_EM.concat(fetch_coreSettingsListBy_typeId).concat('?typeId=').concat('2101').concat('&instituteId=').concat(instituteID);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.access_token,

    },
  };
  try {
    const response = yield call(request, requestURL, options);
    console.log('ac-year', response);

    yield put(setAcademicYearList(response.item));
  } catch (error) { }

};


export function* fetch_PaySlipList() {

  console.log("CLICK");
  
  let emToken = JSON.parse(localStorage.getItem('emToken'));
  let acYear = yield select(makeSelectAcademicYear());
  let stdID = yield select(makeSelectStudentID());

  console.log("CLICK", acYear, stdID);

  // console.log('acyear', acYear, 'classConfigId', classConfigId, 'examConfigId', examConfigId);
  
  const requestURL = BASE_URL_EM.concat(fetch_student_paySlipList).concat('?customStudentId=').concat(stdID).concat('&academicYear=').concat(acYear).concat('&instituteId=').concat('13000');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };

  const response = yield call(request, requestURL, options);
  console.log('PAY SLIP LIST Response>>>>>>>>>>>>>>>>', response.item);
  try {
    yield put(setPaySlipListData(response.item));
  } catch (error) { }

}

// Individual exports for testing
export default function* findPayslipSaga() {
  // See example in containers/HomePage/saga.js
  
  yield fetch_AcademicYearList();

  yield takeLatest(SUBMIT_SEARCH_BUTTON, fetch_PaySlipList)
}
