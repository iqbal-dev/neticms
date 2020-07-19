import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { setDonorMembers } from './actions';
import request from '../../utils/request';
import {BASE_URL_NETI_CMS,fetch_typeWise_memberList
 
} from '../../utils/serviceUrl';

export function* fetch_donorMembers_List() {
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsID = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;
  console.log('donor cmsID',cmsID);

  // let memberList =[
  //   {key: 1, name: 'abc'}
  // ]
  //   yield put(setDonorMembers(memberList));

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_typeWise_memberList).concat('?memberType=').concat('donor').concat('&cmsId=').concat(cmsID);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'

    },
  };
  const response = yield call(request, requestURL, options);
  try {
    console.log('donor response',response);
    yield put(setDonorMembers(response.item));
  } catch (error) { }

}

// Individual exports for testing
export default function* donorMembersSaga() {
  yield fetch_donorMembers_List();
}
