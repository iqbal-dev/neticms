import { take, call, put, select } from 'redux-saga/effects';
import { BASE_URL_NETI_CMS, fetch_syllabusBy_cmsId } from '../../utils/serviceUrl';
import request from '../../utils/request';
import { fetchSyllabusList } from './actions';

export function* fetch_AllSyllabus(){
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

  let cmsId = instituteUrlInfo[0].cmsId;
  const requestURL = BASE_URL_NETI_CMS.concat(fetch_syllabusBy_cmsId).concat('?cmsId=').concat(cmsId);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = yield call(request, requestURL, options);
    console.log('response.item', response.item);
    yield put(fetchSyllabusList(response.item));
    
  } catch (error) {
    
  }


}


// Individual exports for testing
export default function* syllabusInfoSaga() {
  yield fetch_AllSyllabus();
}
