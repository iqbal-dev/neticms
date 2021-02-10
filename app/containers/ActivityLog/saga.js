// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import {
  getClientIp,
  getBrowser,
  getOs,
  getUrlInfoLocally,
  getCustomcmsId
} from "../../utils/localStorageMethod";

import {ACTIVITY_LOG_BASE_URL} from '../../utils/serviceUrl'


export function* activityLogService(activityType, moduleName, pageId, pageName,logMessage) {

  let dayjs = require('dayjs')

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

  // let customNeticmsId = getCustomcmsId();





  // console.log("===================customNeticmsId============= ",customNeticmsId);
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }

  

debugger

  const requestURL = ACTIVITY_LOG_BASE_URL + '/neticms/_doc';
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      activityType: activityType,
      moduleName: moduleName,
      pageId: pageId,
      pageName: pageName,
      // neticmsCustomId: neticmsCustomId,
      urlName : getUrlInfoLocally(),
      logDate: dayjs(new Date()).format('YYYY-MM-DD'),
      logTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      userIp: getClientIp(),
      browser: getBrowser(),
      os: getOs(),
      message: logMessage,
    })
  };
  try {
    yield call(request, requestURL, options);
  } catch (error) { }
}
export default function* activityLogSaga() {
  // See example in containers/HomePage/saga.js
}
