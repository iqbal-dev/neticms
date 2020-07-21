import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { BASE_URL_NETI_CMS, fetch_instituteTopEventBy_cmsId } from '../../utils/serviceUrl';
import request from '../../utils/request';
import { allEventsList, getAllEventsList } from './actions';


export function* fetch_AllEvents(){

  console.log('this is test api');

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

  let cmsId = instituteUrlInfo[0].cmsId;
  const requestURL = BASE_URL_NETI_CMS.concat(fetch_instituteTopEventBy_cmsId).concat('?cmsId=').concat(cmsId);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };


  try {
    const response = yield call(request, requestURL, options);
    console.log('response.item', response.item);
    yield put(getAllEventsList(response.item));
    
  } catch (error) {
    
  }

}

// Individual exports for testing
export default function* allEventsListSaga() {
  // See example in containers/HomePage/saga.js
  yield fetch_AllEvents();
}
