
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_NOTICE_FILE_CONTENT } from './constants';
import { makeSelectNoticeRowdata } from './selectors';
import { BASE_URL_NETI_CMS, fetch_notice_file_content } from '../../utils/serviceUrl';
import request from '../../utils/request';
import { setNoticeFileContent } from './actions';


export function* fetchNoticeFile() {

  let noticeRowdata = yield select(makeSelectNoticeRowdata());

  yield put(setNoticeFileContent(''));

  console.log('fetchNoticeFile saga', noticeRowdata);

  // let selectedRowdata = yield select(makeSelectSyllabusRowdata());
  const requestURL = BASE_URL_NETI_CMS.concat(fetch_notice_file_content).concat('?noticeId=').concat(noticeRowdata.noticeId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // console.log('fetchNoticeFile saga requestURL', requestURL, options);

  try {
    const response = yield call(request, requestURL, options);
    Object.assign(response, {noticeFileName: noticeRowdata.noticeFileName})
    // console.log('setNoticeFile-response', response);
    yield put(setNoticeFileContent(response));

  } catch (error) {

  }

}
// Individual exports for testing
export default function* allNoticeSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_NOTICE_FILE_CONTENT, fetchNoticeFile);
}
