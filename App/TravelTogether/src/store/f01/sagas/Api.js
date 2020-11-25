import {getApi, postApi, patchApi} from '../../../api';
const loginUrl = '/users/login';
const registerUrl = '/users';
const changePersonalInformationUrl = '/users/me';

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

function* callChangePersonalInformation(data) {
  console.log(data);
  const response = yield patchApi(changePersonalInformationUrl, data);
  const responseData = yield response.status === 200 || response.status === 201
    ? response.data
    : {};
  return responseData;
}

export const Api = {callLogin, callRegister, callChangePersonalInformation};
