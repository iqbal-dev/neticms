import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';

import { makeSelectStudentID, makeSelectAttendanceFromDate, makeSelectAttendancToeDate } from './selectors';
import { get_DDMMYY_Format_WithSlash } from '../../utils/dateFormat';
import { postMethod, postMethodWithAuth } from '../../utils/baseMethod';
import { BASE_URL_EM, FETCH_STUDENT_ID_WISE_ATTENDANCE } from '../../utils/serviceUrl';
import { SUBMIT_SEARCH_BUTTON } from './constants';
import { setAttendanceList } from './actions';
var moment = require('moment/moment');

export function* fetchStudentAttendanceByStudentId() {

  const customStdId = yield select(makeSelectStudentID());

  let fromDate = yield select(makeSelectAttendanceFromDate());
  let formatedFromDate = moment(fromDate).format('DD/MM/YYYY');

  let toDate = yield select(makeSelectAttendancToeDate());
  let formatedToDate = moment(toDate).format('DD/MM/YYYY');

  // console.log('toDate', toDate);

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }
  let emToken = JSON.parse(localStorage.getItem('emToken'));

  let requestedBody = {
    "customStudentId": customStdId,
    "fromDate": formatedFromDate,
    "instituteId": instituteId,
    "toDate": formatedToDate,
  }
  console.log('requestedBody-saga', requestedBody);

  // let requestedBody = {
  //   "customStudentId": "1890102",
  //   "fromDate": "01/01/2020",
  //   "instituteId": "13348",
  //   "toDate": "17/08/2020"
  // }

  const requestURL = BASE_URL_EM + FETCH_STUDENT_ID_WISE_ATTENDANCE;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
    body: JSON.stringify(requestedBody)
  };

  try {
    const response = yield call(request, requestURL, options);
    console.log('search-res', response);
    if (response.item) { yield put(setAttendanceList(response.item)) }
    else { yield put(setAttendanceList()) }
  } catch (error) { }

}

// Individual exports for testing
export default function* studentWiseAttendanceSaga() {

  yield takeLatest(SUBMIT_SEARCH_BUTTON, fetchStudentAttendanceByStudentId);

}
