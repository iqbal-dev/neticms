import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { 
  BASE_URL_NETI_CMS, 
  fetch_downloadLinksBy_cmsId, 
  BASE_URL_EM, 
  fetch_downloadFileContent 
} from '../../utils/serviceUrl';
import request from '../../utils/request';
import {
  downloadLinksLists,
  getDownloadFile
} from './actions';
import { SET_DOWNLOAD_ITEM } from './constants';
import { makeSelectDownloadItem } from './selectors'


function emCommonRequestOptions(){
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let emToken = JSON.parse(localStorage.getItem('emToken'));

  let instituteId = '';
  instituteUrlInfo && instituteUrlInfo.length ? 
    instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId 

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };
  return {
    instituteId: instituteId,
    options: options
  }
}

export function* fetch_downloadLinksList(){
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsId = instituteUrlInfo[0].cmsId;

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_downloadLinksBy_cmsId).concat('?cmsId=4');
  console.log('requestURL', cmsId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = yield call(request, requestURL, options);
    console.log('response.item', response.item);
    yield put(downloadLinksLists(response.item));
    
  } catch (error) {
    
  }

}

export function* fetch_downloadItem() {
  console.log("SAGA");
  let downloadItem = yield select(makeSelectDownloadItem());

  yield put(getDownloadFile(''));

  console.log("downloadItem", downloadItem);

  const requestOptions = emCommonRequestOptions();
  const requestURL = BASE_URL_NETI_CMS.concat(fetch_downloadFileContent).concat('?fileId=') + downloadItem.fileId
  
  try {
    const response = yield call(request, requestURL, requestOptions.options);
    console.log('Download Content', response);
    
    yield put(getDownloadFile(response.file));
    // yield put(setAcademicYearList(response.item));
  } catch (error) { }
  
}

// function downloadFile(rowData){

//   const requestOptions = emCommonRequestOptions();

//   let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
//   let cmsId = instituteUrlInfo[0].cmsId;
//   const requestURL = BASE_URL_EM.concat(fetch_downloadFileContent).concat('?fileId=') + cmsId
  
//   try {
//     const response = call(request, requestURL, requestOptions.options);
//     console.log('Download Content', response);

//     // let a = document.createElement("a");
//     // a.href = contentType + response.file;
//     // a.download = rowData.fileName;
//     // document.body.appendChild(a);
//     // a.click();
//     // document.body.removeChild(a);

//     // yield put(getDownloadFile(response.file));
//   } catch (error) { }
  
//   // if (rowData.fileName) {
//   //     this.DwsService.downloadCornerGetByteImage(rowData.fileId).then(res => {
//   //         if (res.status == 302) {
//   //             return res.json().then(body => {
//   //                 let contentType = this.NetiFileHandler.getImageContentType(rowData.fileName);
                  
//   //                 let a = document.createElement("a");
//   //                 a.href = contentType + body.file;
//   //                 a.download = rowData.fileName;
//   //                 document.body.appendChild(a);
//   //                 a.click();
//   //                 document.body.removeChild(a);
//   //             });
//   //         } else {
              
//   //         }
//   //     });
//   // }
// }

// Individual exports for testing
export default function* downloadCornerSaga() {
  // See example in containers/HomePage/saga.js
  yield fetch_downloadLinksList();
  yield takeLatest(SET_DOWNLOAD_ITEM, fetch_downloadItem) ;
}
