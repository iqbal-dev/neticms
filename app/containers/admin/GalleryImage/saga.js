import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectModalStatus, makeSelectAddSerialNumber, makeGalleryImageDetails, makeGalleryImageFileUpload } from './selectors';
import { ADD_SERIAL_NUMBER } from './constants';

export function* submitimageGalleryData() {
  let requestObj = {
    'serialNumber' : yield select(makeSelectAddSerialNumber()),
    'imageTitle' : yield select(makeSelectAddGalleryTitle()),
    'imageDetails' : yield select(makeGalleryImageDetails()),
    'fileName' : yield select(makeGalleryImageFileUpload()),
  }
  
  console.log('modalName', requestObj);
  
}
// Individual exports for testing
export default function* galleryImageSaga() {
  yield takeLatest(ADD_SERIAL_NUMBER, submitimageGalleryData);
}
