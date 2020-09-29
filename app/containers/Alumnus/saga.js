import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { BASE_URL_NETI_CMS, FETCH_ALUMNUS_LIST } from '../../utils/serviceUrl';
import request from '../../utils/request';
import { setLoader, setAlumnusList } from './actions';

export function* fetch_alumnusList() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  const cmsId = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;
  // console.log('donor cmsID',cmsID);

  // yield put(setLoader('loaderOn'));
  const requestURL = BASE_URL_NETI_CMS.concat(FETCH_ALUMNUS_LIST).concat('?cmsId=').concat(cmsId);
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', },
  };
  try {
    const response = yield call(request, requestURL, options);
    console.log('alumnusList-response', response);
    // yield put(setLoader('loaderOff'));
    yield put(setAlumnusList(response));
  } catch (error) { }

}

export default function* alumnusSaga() {
  yield fetch_alumnusList();
}
