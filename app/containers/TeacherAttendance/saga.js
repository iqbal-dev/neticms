import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import {fetch_teacherAttendanceListBy_date,BASE_URL_EM
  
} from '../../utils/serviceUrl';

import {
  SUBMIT_SEARCH_BUTTON, submitSearchButton
} from './constants';
import {setTeacherAttendanceList,
} from './actions';
import {makeSelectAttendanceList, makeSelectAttendanceDate
} from './selectors';



export function* fetch_teacherAttendanceList() {

  let emToken = JSON.parse(localStorage.getItem('emToken'));  
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }
  let attendanceDate = yield select(makeSelectAttendanceDate());


  
  const requestURL = BASE_URL_EM.concat(fetch_teacherAttendanceListBy_date).concat('?stringDate=').concat(attendanceDate).concat('&instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };

  const response = yield call(request, requestURL, options);
  console.log('attendance LIST Res', response);
  try {
    yield put(setTeacherAttendanceList(response.item));
  } catch (error) { }

}

// Individual exports for testing
export default function* teacherAttendanceSaga() {
  yield takeLatest(SUBMIT_SEARCH_BUTTON, fetch_teacherAttendanceList)

  // See example in containers/HomePage/saga.js
}
