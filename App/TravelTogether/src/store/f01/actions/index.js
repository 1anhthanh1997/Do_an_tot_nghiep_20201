import {LOGIN, REGISTER, CHANGE_PERSONAL_INFORMATION} from './actionTypes';

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

export {login, register, changePersonalInformation};
