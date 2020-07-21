import { take, call, put, select } from 'redux-saga/effects';
import { BASE_URL_NETI_CMS, fetch_downloadLinksBy_cmsId } from '../../utils/serviceUrl';
import request from '../../utils/request';
import {downloadLinksLists} from './actions';

export function* fetch_downloadLinksList(){
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsId = instituteUrlInfo[0].cmsId;

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_downloadLinksBy_cmsId).concat('?cmsId=4');
  console.log('requestURL', cmsId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = yield call(request, requestURL, options);
    console.log('response.item', response.item);
    yield put(downloadLinksLists(response.item));
    
  } catch (error) {
    
  }

}

// Individual exports for testing
export default function* downloadCornerSaga() {
  // See example in containers/HomePage/saga.js
  yield fetch_downloadLinksList();
}
