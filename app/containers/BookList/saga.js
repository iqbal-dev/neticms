// import { take, call, put, select } from 'redux-saga/effects';

export function* fetchBookList(){

  console.log('book list saga call');
  
}
// Individual exports for testing
export default function* bookListSaga() {
  // See example in containers/HomePage/saga.js

  yield takeLatest(SUBMIT_CLASS_BUTTON, fetchBookList);

}
