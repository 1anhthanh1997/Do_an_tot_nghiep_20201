import {
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  LOGIN_FAIL,
  LOGIN,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_LOADING,
  REGISTER_FAIL,
  CHANGE_PERSONAL_INFORMATION,
  CHANGE_PERSONAL_INFORMATION_SUCCESS,
  CHANGE_PERSONAL_INFORMATION_LOADING,
  CHANGE_PERSONAL_INFORMATION_FAIL,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAIL,
} from '../actions/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_STORAGE} from '../../../constants';
//Saga effects
import {put, takeLatest} from 'redux-saga/effects';
import {Api} from './Api';

function* login(data) {
  try {
    console.log('Saga');
    yield put({type: LOGIN_LOADING, payload: ''});
    const userInfo = yield Api.callLogin(data.payload);
    // yield console.log(userInfo.token);
    yield AsyncStorage.setItem(ASYNC_STORAGE.ACCESS_TOKEN, userInfo.token);
    // const token = yield AsyncStorage.getItem(ASYNC_STORAGE.ACCESS_TOKEN);
    // yield console.log(token);
    yield put({type: LOGIN_SUCCESS, payload: userInfo.user});
  } catch (error) {
    console.log(error);
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

function* changePersonalInformation(data) {
  try {
    yield put({type: CHANGE_PERSONAL_INFORMATION_LOADING, payload: ''});
    const res = yield Api.callChangePersonalInformation(data.payload);
    console.log(res);
    yield put({type: CHANGE_PERSONAL_INFORMATION_SUCCESS, payload: res});
    yield put({type: LOGIN_SUCCESS, payload: res});
  } catch (e) {
    console.log(e.response);
    yield put({
      type: CHANGE_PERSONAL_INFORMATION_FAIL,
      payload: {
        errorCode: 'EC0003',
        errorMessage: 'Đã xảy ra lỗi. Vui lòng thử lại.',
      },
    });
  }
}

function* changePassword(data) {
  try {
    yield put({type: CHANGE_PASSWORD_LOADING, payload: ''});
    const res = yield Api.callChangePassword(data.payload);
    console.log(res);
    yield put({type: CHANGE_PASSWORD_SUCCESS, payload: res});
  } catch (e) {
    console.log(e.response);
    yield put({
      type: CHANGE_PASSWORD_FAIL,
      payload: {
        errorCode: 'EC0004',
        errorMessage: 'Đã xảy ra lỗi. Vui lòng thử lại.',
      },
    });
  }
}

export function* watchF02() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(REGISTER, register);
  yield takeLatest(CHANGE_PERSONAL_INFORMATION, changePersonalInformation);
  yield takeLatest(CHANGE_PASSWORD, changePassword);
}
