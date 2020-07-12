import { take, call, put, select } from 'redux-saga/effects';
import { makeSelectModalStatus } from './selectors';

export function* getModalValue() {
  let modalName = yield select(makeSelectModalStatus());
  console.log('modalName', modalName);
  
}
// Individual exports for testing
export default function* galleryImageSaga() {
  yield getModalValue();
  // See example in containers/HomePage/saga.js
}
