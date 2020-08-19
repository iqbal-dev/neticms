import { take, call, put, select } from 'redux-saga/effects';
import { BASE_URL_NETI_CMS, fetch_infrastructureListBy_cmsId } from '../../utils/serviceUrl';
import request from '../../utils/request';
import { fetchInfrastructureList } from './actions';

export function* fetch_Infrastructure_List() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

  let cmsId = instituteUrlInfo[0].cmsId;
  const requestURL = BASE_URL_NETI_CMS.concat(fetch_infrastructureListBy_cmsId).concat('?cmsId=').concat(cmsId);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = yield call(request, requestURL, options);
    // console.log('response.item fetchInfrastructureList', response.item);
    yield put(fetchInfrastructureList(response.item));

  } catch (error) {

  }

}

// Individual exports for testing
export default function* basicInfrastuctureSaga() {
  // See example in containers/HomePage/saga.js
  yield fetch_Infrastructure_List();
}
