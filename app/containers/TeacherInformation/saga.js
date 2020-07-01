import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { 
  TEACHER_INFORMATON_LIST,
} from './constants';
import { BASE_URL, BASE_URL_EM, fetch_staffsInformaions } from '../../utils/serviceUrl';
import request from '../../utils/request';
import {teacherInformationList} from './actions';
// Individual exports for testing
export function* teacherInformationSaga() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  
  let token = JSON.parse(localStorage.getItem('emToken'));
  console.log('instituteUrlInfo', instituteUrlInfo);
  
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }
  
  const requestURL = BASE_URL_EM.concat(fetch_staffsInformaions).concat('?categoryName=').concat("Teacher").concat('&instituteId=').concat(instituteId);
  
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.access_token,

    },
  };
  const response = yield call(request, requestURL, options);

  try {
    yield put(teacherInformationList(response.item));
    console.log('response.item', response.item);
    
  } catch (error) { }

}


export default function* teacherListSaga() {
  yield call(teacherInformationSaga);
}
