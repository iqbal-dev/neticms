import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { ONSUBMIT_SEARCH } from './constants';
import { makeSelectDate } from './selectors';
import { setSectionWiseAttendanceListData, setChartDataArray } from './actions';
import { BASE_URL_EM, FETCH_SECTION_WISE_ATTENDANCE } from '../../utils/serviceUrl';
import request from '../../utils/request';
import { get_DDMMYY_Format_WithHyphen } from '../../utils/dateFormat';

export function* fetchDataByDate() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }

  let emToken = JSON.parse(localStorage.getItem('emToken'));
  let date = yield select(makeSelectDate());
  let formatedDate = get_DDMMYY_Format_WithHyphen(date);

  const requestURL = BASE_URL_EM + FETCH_SECTION_WISE_ATTENDANCE + '?stringDate=' + formatedDate + '&instituteId=' + instituteId;
  //  BASE_URL_EM + FETCH_SECTION_WISE_ATTENDANCE+'?stringDate=25-01-2020&instituteId=13348';

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };

  try {
    const response = yield call(request, requestURL, options);
    // console.log('search-res', response);

    if (response) {

      yield put(setSectionWiseAttendanceListData(response));

      let chartObj = [];

      let totalStd = 0;
      let totalPresentStd = 0;
      let totalAbsentStd = 0;
      let totalLeaveStd = 0;

      response.forEach(attendanceDetails => {

        totalStd += attendanceDetails.totalAttenTakenStds;
        totalPresentStd += attendanceDetails.presentStds;
        totalAbsentStd += attendanceDetails.absentStds;
        totalLeaveStd += attendanceDetails.totalLeaveStds;
      });

      chartObj = {
        totalStdData: totalStd,
        presentData: totalPresentStd,
        absentData: totalAbsentStd,
        leaveData: totalLeaveStd,
        presentPercent: ((totalPresentStd * 100) / totalStd).toFixed(1),
        absentPercent: ((totalAbsentStd * 100) / totalStd).toFixed(1),
        leavePercent: ((totalLeaveStd * 100) / totalStd).toFixed(1),
      }

      yield put(setChartDataArray(chartObj))
    }

  } catch (error) { }

}

// Individual exports for testing
export default function* sectionWiseAttendanceSaga() {
  yield takeLatest(ONSUBMIT_SEARCH, fetchDataByDate);
}
