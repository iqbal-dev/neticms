import { take, call, put, select } from 'redux-saga/effects';
import request from '../../../utils/request';
import {
  BASE_URL_NETI_CMS,
  fetch_classConfigListBy_cmsId,
  fetch_coreConfigListBy_cmsId,
  FETCH_PUBLIC_ADMISIA_CLASS_CONFIG_LIST_BY_CMS_ID
} from '../../../utils/serviceUrl';
import { setClassConfigList, setDataTableLoader } from './actions';
import { makeSelectClassConfigList } from './selectors';

export function* fetch_classConfigList() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsID = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;

  const requestURL = BASE_URL_NETI_CMS.concat(FETCH_PUBLIC_ADMISIA_CLASS_CONFIG_LIST_BY_CMS_ID).concat('?cmsId=').concat(cmsID);
  const requestURLforAdmissionYear = BASE_URL_NETI_CMS.concat(fetch_coreConfigListBy_cmsId).concat('?cmsId=').concat(cmsID);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let getClassConfigListFromStore = yield select(makeSelectClassConfigList())
  // console.log("makeSelectClassConfigList", getClassConfigListFromStore);

  if (!getClassConfigListFromStore.classConfigList) {
    yield put(setDataTableLoader(true));

    const response = yield call(request, requestURL, options);
    // console.log('response-list', response);

    const responseAdmissionYear = yield call(request, requestURLforAdmissionYear, options);
    console.log('responseAdmissionYear-list', responseAdmissionYear);

    try {
      let classConfigObj = {
        coreConfigObj: responseAdmissionYear.item,
        classConfigList: response.item
      }
      // console.log("response classConfigList", classConfigObj);
      yield put(setClassConfigList(classConfigObj));
      yield put(setDataTableLoader(false));
    } catch (error) { }
  }
}

// Individual exports for testing
export default function* onlineAdmissionSaga() {
  yield fetch_classConfigList()
}
