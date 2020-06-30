import { take, call, put, select } from 'redux-saga/effects';
import { fetch_coreSettingsListBy_typeId, BASE_URL_EM } from '../../utils/serviceUrl';

export function* fetch_AcademicYearList() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let token = JSON.parse(localStorage.getItem('token'));

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

// Individual exports for testing
export default function* findPayslipSaga() {
  // See example in containers/HomePage/saga.js
  yield fetch_AcademicYearList();
}
