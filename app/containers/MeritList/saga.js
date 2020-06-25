import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectAcademicYear } from './selectors';
import { SUBMIT_SEARCH_BUTTON, SET_ACADEMIC_YEAR } from './constants';

// Individual exports for testing

export function* fetch_SectionListByAcademicYear() {

  console.log('academic-year', yield select(makeSelectAcademicYear()));

}

export function* fetch_meritList() {

  console.log('saga-merit-list-search-btn-called');

}

export default function* meritListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SET_ACADEMIC_YEAR, fetch_SectionListByAcademicYear);
  yield takeLatest(SUBMIT_SEARCH_BUTTON, fetch_meritList);
}
