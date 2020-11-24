import {call, all} from 'redux-saga/effects';
import {watchLogin} from './UserInfoSaga';

export default function* rootSaga() {
  yield call(watchLogin);
}
