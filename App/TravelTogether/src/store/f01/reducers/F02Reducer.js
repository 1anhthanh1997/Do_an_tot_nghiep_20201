import {
  CHANGE_PERSONAL_INFORMATION_FAIL,
  CHANGE_PERSONAL_INFORMATION_LOADING,
  CHANGE_PERSONAL_INFORMATION_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_FAIL,
} from '../actions/actionTypes';

import {STATUS} from '../../../constants';

const initUserInfo = {
  changePersonalInformation: {
    status: STATUS.DEFAULT,
    changePersonalInformationResultData: {},
    errorCode: '',
    errorMessage: '',
  },
  changePassword: {
    status: STATUS.DEFAULT,
    changePasswordResultData: {},
    errorCode: '',
    errorMessage: '',
  },
};

const f02Reducer = (info = initUserInfo, action) => {
  switch (action.type) {
    case CHANGE_PERSONAL_INFORMATION_SUCCESS:
      return {
        ...info,
        changePersonalInformation: {
          status: STATUS.SUCCESS,
          changePersonalInformationResultData: action.payload,
        },
      };
    case CHANGE_PERSONAL_INFORMATION_LOADING:
      return {
        ...info,
        changePersonalInformation: {
          status: STATUS.LOADING,
        },
      };
    case CHANGE_PERSONAL_INFORMATION_FAIL:
      return {
        ...info,
        changePersonalInformation: {
          status: STATUS.ERROR,
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        },
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...info,
        changePassword: {
          status: STATUS.SUCCESS,
          changePasswordResultData: action.payload,
        },
      };
    case CHANGE_PASSWORD_LOADING:
      return {
        ...info,
        changePassword: {
          status: STATUS.LOADING,
        },
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...info,
        changePassword: {
          status: STATUS.ERROR,
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        },
      };
    default:
      return info; //state does not change
  }
};

export default f02Reducer;
