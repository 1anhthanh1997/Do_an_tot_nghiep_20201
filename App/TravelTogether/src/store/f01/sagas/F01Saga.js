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
  GET_ALL_TRIP,
  GET_ALL_TRIP_SUCCESS,
  GET_ALL_TRIP_FAIL,
  CREATE_TRIP,
  CREATE_TRIP_LOADING,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_FAIL,
  EDIT_TRIP_LOADING,
  EDIT_TRIP_SUCCESS,
  EDIT_TRIP_FAIL,
  EDIT_TRIP,
  GET_ALL_TRIP_LOADING,
  JOIN_TRIP,
  JOIN_TRIP_LOADING,
  JOIN_TRIP_SUCCESS,
  JOIN_TRIP_FAIL,
  GET_MEMBER_INFO_LOADING,
  GET_MEMBER_INFO_SUCCESS,
  GET_MEMBER_INFO_FAIL,
  GET_MEMBER_INFO,
  ADD_DESTINATION_LOADING,
  ADD_DESTINATION_SUCCESS,
  ADD_DESTINATION_FAIL,
  ADD_DESTINATION,
  EDIT_DESTINATION,
} from '../actions/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_STORAGE} from '../../../constants';
//Saga effects
import {put, takeLatest} from 'redux-saga/effects';
import {Api} from './Api';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

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
    console.log('Hello');
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

function* getAllTrip() {
  try {
    console.log('Hello');
    yield put({type: GET_ALL_TRIP_LOADING, payload: ''});
    const res = yield Api.callGetAllTrip();
    console.log(res);
    yield put({type: GET_ALL_TRIP_SUCCESS, payload: res});
  } catch (e) {
    console.log(e);
    yield put({
      type: GET_ALL_TRIP_FAIL,
      payload: {
        errorCode: 'EC0004',
        errorMessage: 'Đã xảy ra lỗi. Vui lòng thử lại.',
      },
    });
  }
}

function* createTrip(trip) {
  try {
    console.log('Hello');
    yield put({type: CREATE_TRIP_LOADING, payload: ''});
    const res = yield Api.callCreateTrip(trip.payload);
    console.log(res);
    yield put({type: CREATE_TRIP_SUCCESS, payload: res});
  } catch (e) {
    console.log(e.response);
    yield put({
      type: CREATE_TRIP_FAIL,
      payload: {
        errorCode: 'EC0004',
        errorMessage: 'Đã xảy ra lỗi. Vui lòng thử lại.',
      },
    });
  }
}

function* editTrip(newTrip) {
  try {
    yield put({type: EDIT_TRIP_LOADING, payload: ''});
    console.log(newTrip.payload);
    const res = yield Api.callEditTrip(newTrip.payload._id, newTrip.payload);
    console.log(res);
    yield put({type: EDIT_TRIP_SUCCESS, payload: res});
  } catch (e) {
    console.log(e.response);
    yield put({
      type: EDIT_TRIP_FAIL,
      payload: {
        errorCode: 'EC0004',
        errorMessage: 'Đã xảy ra lỗi. Vui lòng thử lại.',
      },
    });
  }
}

function* joinTrip(trip) {
  try {
    yield put({type: JOIN_TRIP_LOADING, payload: ''});
    console.log(trip.payload);
    const res = yield Api.callJoinTrip(trip.payload);
    console.log(res);
    yield put({type: JOIN_TRIP_SUCCESS, payload: res});
  } catch (e) {
    console.log(e.response);
    yield put({
      type: JOIN_TRIP_FAIL,
      payload: {
        errorCode: 'EC0004',
        errorMessage: 'Đã xảy ra lỗi. Vui lòng thử lại.',
      },
    });
  }
}

function* getMemberInfo(user) {
  try {
    yield put({type: GET_MEMBER_INFO_LOADING, payload: ''});
    console.log(user.payload);
    const res = yield Api.callGetMemberInfo(user.payload);
    console.log(res);
    yield put({type: GET_MEMBER_INFO_SUCCESS, payload: res});
  } catch (e) {
    console.log(e.response);
    yield put({
      type: GET_MEMBER_INFO_FAIL,
      payload: {
        errorCode: 'EC0004',
        errorMessage: 'Đã xảy ra lỗi. Vui lòng thử lại.',
      },
    });
  }
}

function* addDestination(destination) {
  try {
    yield put({type: ADD_DESTINATION_LOADING, payload: ''});
    console.log(destination.payload);
    const res = yield Api.callAddDestination(destination.payload);
    console.log('Hello');
    console.log(res);
    yield put({type: ADD_DESTINATION_SUCCESS, payload: res});
  } catch (e) {
    console.log(e.response);
    yield put({
      type: ADD_DESTINATION_FAIL,
      payload: {
        errorCode: 'EC0004',
        errorMessage: 'Đã xảy ra lỗi. Vui lòng thử lại.',
      },
    });
  }
}

function* editDestination(destination) {
  try {
    yield put({type: ADD_DESTINATION_LOADING, payload: ''});
    console.log(destination.payload);
    const res = yield Api.callAddDestination(destination.payload);
    console.log('Hello');
    console.log(res);
    yield put({type: ADD_DESTINATION_SUCCESS, payload: res});
  } catch (e) {
    console.log(e.response);
    yield put({
      type: ADD_DESTINATION_FAIL,
      payload: {
        errorCode: 'EC0004',
        errorMessage: 'Đã xảy ra lỗi. Vui lòng thử lại.',
      },
    });
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(REGISTER, register);
  yield takeLatest(CHANGE_PERSONAL_INFORMATION, changePersonalInformation);
  yield takeLatest(CHANGE_PASSWORD, changePassword);
  yield takeLatest(GET_ALL_TRIP, getAllTrip);
  yield takeLatest(CREATE_TRIP, createTrip);
  yield takeLatest(EDIT_TRIP, editTrip);
  yield takeLatest(JOIN_TRIP, joinTrip);
  yield takeLatest(GET_MEMBER_INFO, getMemberInfo);
  yield takeLatest(ADD_DESTINATION, addDestination);
  yield takeLatest(EDIT_DESTINATION, editDestination);
}
