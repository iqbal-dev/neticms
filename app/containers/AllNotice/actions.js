/*
 *
 * AllNotice actions
 *
 */

import { DEFAULT_ACTION, SET_NOTICE_FILE_CONTENT } from './constants';
import {
  GET_NOTICE_FILE_CONTENT
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getNoticeFileContent(singleRowData) {
  return {
    type: GET_NOTICE_FILE_CONTENT,
    singleRowData
  };
}

export function setNoticeFileContent(singleFileContent) {
  return {
    type: SET_NOTICE_FILE_CONTENT,
    singleFileContent
  };
}

// 