import { take, call, put, select } from 'redux-saga/effects';
import { BASE_URL_NETI_CMS, fetch_galleryImageBy_cmsId } from '../../utils/serviceUrl';
import request from '../../utils/request';
import { fetchGalleryImageList, setGalleryImageLoader } from './actions';

export function* fetch_Image_Gallery_List(){

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

  let cmsId = instituteUrlInfo[0].cmsId;
  const requestURL = BASE_URL_NETI_CMS.concat(fetch_galleryImageBy_cmsId).concat('?cmsId=').concat(cmsId);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  yield put(setGalleryImageLoader(true));

  try {
    const response = yield call(request, requestURL, options);
    console.log('response.item', response.item);
    yield put(fetchGalleryImageList(response.item));
    yield put(setGalleryImageLoader(false));
    
  } catch (error) {
    
  }

}


// Individual exports for testing
export default function* eventGallerySaga() {
  // See example in containers/HomePage/saga.js
  yield fetch_Image_Gallery_List();
}
