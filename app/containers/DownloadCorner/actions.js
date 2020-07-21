/*
 *
 * DownloadCorner actions
 *
 */

import { DEFAULT_ACTION, DOWNLOAD_ALL_LINKS } from './constants';

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
