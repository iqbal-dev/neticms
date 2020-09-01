/*
 *
 * DressCode reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SET_DRESS_CODE_LIST, SET_PANEL_TAB_STATUS, SET_PANEL_MALE_TAB_STATUS, SET_MALE_DRESS_CODE_LIST,
  SET_FEMALE_DRESS_CODE_LIST, SET_COMBINED_DRESS_CODE_LIST, SET_LOADER
} from './constants';

export const initialState = fromJS({
  activeTab: '1',
  initDressCodeList: [],
  maleDressCodeList: [],
  femaleDressCodeList: [],
  combinedDressCodeList: [],
  loaderType: '',
});

function dressCodeReducer(state = initialState, action) {
  switch (action.type) {

    case DEFAULT_ACTION:
      return state;

    case SET_DRESS_CODE_LIST:
      return state.set('initDressCodeList', action.dressCodeList);

    case SET_MALE_DRESS_CODE_LIST:
      return state.set('maleDressCodeList', action.maleDressCodeList);

    case SET_FEMALE_DRESS_CODE_LIST:
      return state.set('femaleDressCodeList', action.femaleDressCodeList);

    case SET_COMBINED_DRESS_CODE_LIST:
      return state.set('combinedDressCodeList', action.combinedDressCodeList);

    case SET_LOADER:
      return state.set('loaderType', action.loaderType);

    case SET_PANEL_TAB_STATUS:
      return state.set('activeTab', action.activeId);

    default:
      return state;
  }
}

export default dressCodeReducer;
