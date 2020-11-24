import {
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_LOADING,
  REGISTER_FAIL,
} from '../actions/actionTypes';

import {STATUS} from '../../../constants';

const initUserInfo = {
  login: {
    status: STATUS.DEFAULT,
    loginResultData: {},
    errorCode: '',
    errorMessage: '',
  },
  register: {
    status: STATUS.DEFAULT,
    registerResultData: {},
    errorCode: '',
    errorMessage: '',
  },
};

const f01Reducer = (info = initUserInfo, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...info,
        login: {
          status: STATUS.SUCCESS,
          loginResultData: action.payload,
        },
      };
    case LOGIN_LOADING:
      return {
        ...info,
        login: {
          status: STATUS.LOADING,
        },
      };
    case LOGIN_FAIL:
      return {
        ...info,
        login: {
          status: STATUS.ERROR,
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        },
      };
    case REGISTER_SUCCESS:
      return {
        ...info,
        register: {
          status: STATUS.SUCCESS,
          loginResultData: action.payload,
        },
      };
    case REGISTER_LOADING:
      return {
        ...info,
        register: {
          status: STATUS.LOADING,
        },
      };
    case REGISTER_FAIL:
      return {
        ...info,
        register: {
          status: STATUS.ERROR,
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        },
      };
    default:
      return info; //state does not change
  }
};

export default f01Reducer;
