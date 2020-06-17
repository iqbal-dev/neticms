import { take, call, put, select } from 'redux-saga/effects';
import { setDonorMembers } from './actions';

export function* fetch_donorMembers_List() {

  let memberList =[
    {key: 1, name: 'abc'}
  ]
    yield put(setDonorMembers(memberList));

  // const requestURL = BASE_URL.concat().concat('?urlid=').concat(urlInfoId);
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };
  // const response = yield call(request, requestURL, options);
  // try {
  //   yield put(setDonorMembers(response));
  // } catch (error) { }

}

// Individual exports for testing
export default function* donorMembersSaga() {
  yield fetch_donorMembers_List();
}
