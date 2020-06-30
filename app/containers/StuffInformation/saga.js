import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { BASE_URL, fetch_staffsInformaions, BASE_URL_EM } from '../../utils/serviceUrl';
import { getMethod, getMethodWithAuth } from '../../utils/baseMethod';
import { STUFF_SEARCH_BUTTON } from './constants'
import { setStaffInfoList } from './actions';
import { makeSelectStuffRowData } from './selectors'
import { makeSelectAccessToken } from '../HomePage/selectors';

export function* fetch_stuffsInfoList() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }
  let emToken = JSON.parse(localStorage.getItem('emToken'));

  const token = JSON.parse(localStorage.getItem("emToken")) ;
  console.log("TOKENNNNN:::", token);
  
  const requestURL = BASE_URL_EM.concat(fetch_staffsInformaions).concat('?categoryName=').concat("Staff").concat('&instituteId=').concat(instituteId);
  const options =     {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': emToken.token_type + ' ' + emToken.access_token
    }
  }
  // getMethodWithAuth(token.access_token);
  const response = yield call(request, requestURL, options);

  try {
    console.log('staff-information-response', response);

    yield put(setStaffInfoList(response.item));
  } catch (error) { console.log('error-res', error); }

}

export function* fetch_stuffsInfoBySearch() {

  console.log("search function clicked");
  let rowData = yield select(makeSelectStuffRowData());

  console.log("rowData clicked", rowData);

}

export default function* stuffInformationSaga() {
  yield fetch_stuffsInfoList();
}
