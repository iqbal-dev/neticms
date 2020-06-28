import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { 
  SET_ON_CHANGE_ACADEMIC_YEAR, 
  SET_ON_CHANGE_SECTION, 
  SET_ON_CHANGE_EXAM_TYPE
} from './constants';
import { BASE_URL_EM } from '../../utils/serviceUrl';
import { makeSelectAccessToken } from '../Header/selectors';
import request from '../../utils/request';


export function* makeChangeAcademicYear(data) {
  console.log("makeChangeAcademicYear Saga", data);
}

export function* makeChangeSection(data) {
  console.log("makeChangeSection Saga", data);
}

export function* makeChangeExamType(data) {
  console.log("makeChangeExamType Saga", data);
}

export function* getFailListData() {
  console.log("......................................................................................... Saga");
  // console.log('history func', urlInfoId);

  let token = yield select(makeSelectAccessToken())
  console.log("TOKEN>>>>>>>>>>>>>>", token);

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
  console.log('FAIL LIST Response>>>>>>>>>>>>>>>>', response);
  try {
    yield put(setFailListData(response.item));
  } catch (error) { }

}

export default function* failListSaga() {
  yield takeLatest(SET_ON_CHANGE_ACADEMIC_YEAR, makeChangeAcademicYear );
  yield takeLatest(SET_ON_CHANGE_SECTION, makeChangeSection );
  yield takeLatest(SET_ON_CHANGE_EXAM_TYPE, makeChangeExamType );

  yield call(getFailListData);
}
