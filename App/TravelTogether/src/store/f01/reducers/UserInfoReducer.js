import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  LOGIN_FAIL,
} from '../actions/actionTypes';

import {STATUS} from '../../../constants';

const initUserInfo = {
  status: STATUS.DEFAULT,
  userInfoData: {},
  errorCode: '',
  errorMessage: '',
};

const userInfoReducer = (info = initUserInfo, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...info,
        status: STATUS.SUCCESS,
        userInfoData: action.payload,
      };
    case LOGIN_LOADING:
      return {
        ...info,
        status: STATUS.LOADING,
      };
    case LOGIN_FAIL:
      return {
        ...info,
        status: STATUS.ERROR,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return info; //state does not change
  }
};

export default userInfoReducer;
