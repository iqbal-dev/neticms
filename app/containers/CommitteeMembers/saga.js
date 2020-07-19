import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { setCommitteeMembers } from './actions';
import request from '../../utils/request';
import {BASE_URL_NETI_CMS,fetch_typeWise_memberList
 
} from '../../utils/serviceUrl';


export function* fetch_committeeMembers_List() {
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsID = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;
  console.log('commiitee cmsID',cmsID);

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_typeWise_memberList).concat('?memberType=').concat('committee').concat('&cmsId=').concat(cmsID);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'

    },
  };
  const response = yield call(request, requestURL, options);
  try {
    console.log('committee response',response);
    yield put(setCommitteeMembers(response.item));
  } catch (error) { }

}

export default function* committeeMembersSaga() {
  yield fetch_committeeMembers_List();
}
