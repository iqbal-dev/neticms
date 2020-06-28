import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { 
  SET_ON_CHANGE_ACADEMIC_YEAR, 
  SET_ON_CHANGE_SECTION, 
  SET_ON_CHANGE_EXAM_TYPE
} from './constants';
import { BASE_URL_EM, fetch_coreSettingsListBy_typeId } from '../../utils/serviceUrl';
import { makeSelectAccessToken } from '../Header/selectors';
import request from '../../utils/request';
import { setFailListData } from './actions';


export function* makeChangeAcademicYear(data) {
  console.log("makeChangeAcademicYear Saga", data);
}

export function* makeChangeSection(data) {
  console.log("makeChangeSection Saga", data);
}

export function* makeChangeExamType(data) {
  console.log("makeChangeExamType Saga", data);
}

export function* fetch_AcademicYearList() {

  console.log("......................................................................................... Academic Year");
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let token = JSON.parse(localStorage.getItem('token'));


  // let instituteUrlInfo = yield select(makeSelectInstituteUrlInfo());
  // let instituteID = instituteUrlInfo.coreUrlMappingDTOs[0].edumanDetailsInfoDTO.instituteId;
  console.log("instituteUrlInfo merit list", instituteUrlInfo)
  console.log("token merit list", token)

  // let instituteID = '10012';
  // let typeID = '2101';
  // console.log('instituteUrlInfo',instituteUrlInfo.coreUrlMappingDTOs[0].edumanDetailsInfoDTO.instituteId);
  const requestURL = BASE_URL_EM.concat(fetch_coreSettingsListBy_typeId).concat('?typeId=').concat('2101').concat('&instituteId=').concat(instituteID);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.access_token,

    },
  };
  const response = yield call(request, requestURL, options);
  console.log('acedemic yr list response', response);
  // try {
  //   yield put(setSectionList(response.item));
  //   } catch (error) { }
}; 

export function* getFailListData() {
  console.log("......................................................................................... Fail List Data");
  // console.log('history func', urlInfoId);

  let token = JSON.parse(localStorage.getItem('token'))
  // console.log("TOKEN>>>>>>>>>>>>>>", token);

  // let instituteUrlInfo = yield select(makeSelectInstituteUrlInfo());
  // console.log("instituteUrlInfo", instituteUrlInfo);
  // let instituteID = instituteUrlInfo && instituteUrlInfo.coreUrlMappingDTOs[0] && instituteUrlInfo.coreUrlMappingDTOs[0].edumanDetailsInfoDTO.instituteId;

  // console.log("instituteID", instituteID);
  
  const requestURL = BASE_URL_EM.concat('/nw/sa-point/student/section-wise/result/failed/details?classConfigId=100152&examConfigId=57&academicYear=2019').concat('&instituteId=').concat('10012');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.access_token,

    },
  };

  const response = yield call(request, requestURL, options);
  // console.log('FAIL LIST Response>>>>>>>>>>>>>>>>', response);
  try {
    yield put(setFailListData(response.item));
  } catch (error) { }

}

export default function* failListSaga() {
  yield takeLatest(SET_ON_CHANGE_ACADEMIC_YEAR, makeChangeAcademicYear );
  yield takeLatest(SET_ON_CHANGE_SECTION, makeChangeSection );
  yield takeLatest(SET_ON_CHANGE_EXAM_TYPE, makeChangeExamType );

  yield call(fetch_AcademicYearList());

  yield call(getFailListData);
}
