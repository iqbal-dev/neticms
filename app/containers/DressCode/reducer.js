/*
 *
 * DressCode reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION ,SET_DRESS_CODE_LIST, SET_PANEL_TAB_STATUS, SET_PANEL_MALE_TAB_STATUS} from './constants';

export const initialState = fromJS({
  activeTab: '1',
  initDressCodeList: [],
});

function dressCodeReducer(state = initialState, action) {
  switch (action.type) {

    case DEFAULT_ACTION:
      return state;

      case SET_DRESS_CODE_LIST:
        return state.set('initDressCodeList', action.dressCodeList);
      
      case SET_PANEL_TAB_STATUS:
        return state.set('activeTab', action.activeId);
      
    default:
      return state;
  }
}

export default dressCodeReducer;
