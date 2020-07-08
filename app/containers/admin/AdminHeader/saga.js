import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { setAuthenticatedStatus } from '../../../utils/localStorageMethod';
import { HANDLE_LOGOUT } from './constants';


// Individual exports for testing
export default function* adminHeaderSaga() {
  // yield takeLatest(HANDLE_LOGOUT, handleLogoutSumbit);
}
