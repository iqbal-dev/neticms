/*
 *
 * DownloadCorner actions
 *
 */

import {
  DEFAULT_ACTION,
  DOWNLOAD_ALL_LINKS,
  SET_DOWNLOAD_ITEM,
  GET_DOWNLOAD_ITEM,
  SET_LOADER
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function downloadLinksLists(downloadLinks) {
  return {
    type: DOWNLOAD_ALL_LINKS,
    downloadLinks
  };
}

export function makeClickDownloadButton(e, downloadItem) {
  return {
    type: SET_DOWNLOAD_ITEM,
    downloadItem
  };
}

export function getDownloadFile(downloadFile) {
  return {
    type: GET_DOWNLOAD_ITEM,
    downloadFile
  };
}

// getDownloadFile

export function setLoader(loaderType) {
  return { type: SET_LOADER, loaderType, };
}