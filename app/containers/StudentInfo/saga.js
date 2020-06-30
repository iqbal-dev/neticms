import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { CLASS_NAME_LIST } from './constants';
import { BASE_URL_EM, fetch_coreSettingsClassConfigurationListBy_instituteId } from '../../utils/serviceUrl';
import request from '../../utils/request';
import { classNameListDropDown} from './actions';
import { makeSelectClassNameSelected } from './selectors';

export function* fetchClassName(){
  let token = JSON.parse(localStorage.getItem('emToken'));
  console.log('token', token);
  
  const requestURL = BASE_URL_EM.concat(fetch_coreSettingsClassConfigurationListBy_instituteId).concat('?instituteId=').concat('10060');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.access_token,
    },
  };
  const response = yield call(request, requestURL, options);


  try {
    yield put(classNameListDropDown(response.item));
    console.log('response.item', response.item);
    
  } catch (error) { }

}

export function* fetchStudentInformation(){
 
  
}

// Individual exports for testing
export default function* studentInfoSaga() {
  yield call(fetchClassName);
  // See example in containers/HomePage/saga.js
}
