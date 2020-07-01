import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { SET_ON_CHANGE_DATE } from './constants';
import { makeSelectDate } from './selectors';
import { setSectionWiseAttendanceListData } from './actions';
import { BASE_URL_EM, fetch_sectionWise_attendance } from '../../utils/serviceUrl';
import request from '../../utils/request';


export function* fetch_Date() {

  console.log("CLICK");

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }

  let emToken = JSON.parse(localStorage.getItem('emToken'));
  let date = yield select(makeSelectDate());

  const requestURL = BASE_URL_EM + fetch_sectionWise_attendance+'?stringDate=' + date + '&instituteId=10301' //+ instituteId;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };

  const response = yield call(request, requestURL, options);
  console.log('Section Wise Attendance Response>>>>>>>>>>>>>>>>', response);
  try {
    yield put(setSectionWiseAttendanceListData(response));
  } catch (error) { }

  
}
// Individual exports for testing
export default function* sectionWiseAttendanceSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SET_ON_CHANGE_DATE, fetch_Date);
}
