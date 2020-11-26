import {
  LOGIN,
  REGISTER,
  CHANGE_PERSONAL_INFORMATION,
  CHANGE_PASSWORD,
} from './actionTypes';

const login = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

const register = (data) => {
  return {
    type: REGISTER,
    payload: data,
  };
};

const changePersonalInformation = (data) => {
  return {
    type: CHANGE_PERSONAL_INFORMATION,
    payload: data,
  };
};

const changePassword = (data) => {
  return {
    type: CHANGE_PASSWORD,
    payload: data,
  };
};

export {login, register, changePersonalInformation, changePassword};
