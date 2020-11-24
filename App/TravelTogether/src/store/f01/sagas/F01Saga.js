import {
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  LOGIN_FAIL,
  LOGIN,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_LOADING,
  REGISTER_FAIL,
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

function* register(data) {
  try {
    yield put({type: REGISTER_LOADING, payload: ''});
    const userInfo = yield Api.callRegister(data.payload);
    console.log(userInfo);
    yield put({type: REGISTER_SUCCESS, payload: userInfo.user});
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status === 404) {
      yield put({
        type: REGISTER_FAIL,
        payload: {
          errorCode: 'EC0001',
          errorMessage: 'Đã xảy ra lỗi. Vui lòng kiểm tra và thử lại.',
        },
      });
    }
    if (error.response.status === 409) {
      yield put({
        type: REGISTER_FAIL,
        payload: {
          errorCode: 'EC0002',
          errorMessage:
            'Tên đăng nhập đã tồn tại vui lòng chọn tên đăng nhập khác.',
        },
      });
    }
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(REGISTER, register);
}
