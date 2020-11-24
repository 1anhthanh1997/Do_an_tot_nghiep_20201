import {getApi, postApi} from '../../../api';
const loginUrl = '/users/login';
const registerUrl = '/users';

function* callLogin(data) {
  console.log('Call');
  const response = yield postApi(loginUrl, data);
  console.log(response);
  const userInfo = yield response.status === 200 || response.status === 201
    ? response.data
    : {};
  return userInfo;
}

function* callRegister(data) {
  console.log('Call');
  const response = yield postApi(registerUrl, data);
  console.log(response);
  const userInfo = yield response.status === 200 || response.status === 201
    ? response.data
    : null;
  return userInfo;
}

export const Api = {callLogin, callRegister};
