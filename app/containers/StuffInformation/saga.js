import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { BASE_URL, FETCH_STAFF_INFORMATION, BASE_URL_EM } from '../../utils/serviceUrl';
import { setStaffInfoList, setLoader } from './actions';

export function* fetch_stuffsInfoList() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }
  let emToken = JSON.parse(localStorage.getItem('emToken'));
  yield put(setLoader('autoLoadOn'));

  const requestURL = BASE_URL_EM.concat(FETCH_STAFF_INFORMATION).concat('?categoryName=').concat("Staff").concat('&instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': emToken.token_type + ' ' + emToken.access_token
    }
  }
  const response = yield call(request, requestURL, options);
  yield put(setLoader('autoLoadOff'));

  try {
    console.log('staff-information-response', response);
    yield put(setStaffInfoList(response.item));
  } catch (error) { console.log('error-res', error); }

}

export default function* stuffInformationSaga() {
  yield fetch_stuffsInfoList();
}
