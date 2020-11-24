import {call, all} from 'redux-saga/effects';
import {watchLogin} from './F01Saga';

export default function* rootSaga() {
  yield call(watchLogin);
}
