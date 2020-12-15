import {call, all} from 'redux-saga/effects';
import {watchLogin} from './F01Saga';
import {watchF02} from './F02Saga';

export default function* rootSaga() {
  yield call(watchLogin);
}
