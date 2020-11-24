import {
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  LOGIN_FAIL,
  LOGIN,
} from '../actions/actionTypes';
//Saga effects
import {put, takeLatest} from 'redux-saga/effects';
import {Api} from './Api';

function* login(data) {
  try {
    console.log('Saga');
    yield put({type: LOGIN_LOADING, payload: ''});
    const userInfo = yield Api.callLogin(data.payload);
    yield console.log(userInfo);
    yield put({type: LOGIN_SUCCESS, payload: userInfo.user});
  } catch (error) {
    console.log(error.response);
    if (error.response.status === 404) {
      yield put({
        type: LOGIN_FAIL,
        payload: {
          errorCode: 'EC0001',
          errorMessage:
            'Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra và thử lại.',
        },
      });
    }
  }
}
export function* watchLogin() {
  yield takeLatest(LOGIN, login);
}
