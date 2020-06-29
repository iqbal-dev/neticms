import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { BASE_URL, fetch_staffsInformaions, BASE_URL_EM } from '../../utils/serviceUrl';
import { getMethod, getMethodWithAuth } from '../../utils/baseMethod';
import {STUFF_SEARCH_BUTTON} from './constants'
import { setStaffInfoList } from './actions';
import { makeSelectAccessToken } from '../Header/selectors';
import {makeSelectStuffRowData} from './selectors'

export function* fetch_stuffsInfoList() {

  const token = JSON.parse(localStorage.getItem("token")) ;
  console.log("TOKENNNNN:::", token);
  
  const requestURL = BASE_URL_EM.concat(fetch_staffsInformaions).concat('?categoryName=').concat("Staff").concat('&instituteId=').concat("10020");
  const options =     {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token.token_type + ' ' + token.access_token
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
  yield takeLatest(STUFF_SEARCH_BUTTON, fetch_stuffsInfoBySearch );

  
}


