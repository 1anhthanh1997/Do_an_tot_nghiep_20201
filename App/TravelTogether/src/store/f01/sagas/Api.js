import {
  getApi,
  postApi,
  userPostApi,
  patchApi,
  secondPatchApi,
  thirdPatchApi,
  secondGetApi,
} from '../../../api';
const loginUrl = '/users/login';
const registerUrl = '/users';
const changePersonalInformationUrl = '/users/me';
const changePasswordUrl = '/users/changePass';
const getAllTripUrl = '/tripList';
const postTripUrl = '/trip';
const editTripUrl = '/editTrip/';
const joinTripUrl = '/joinTrip/';
const getMemberInfoUrl = '/memberInfo/';
const addDestinationUrl = '/addDestination/';
const editDestinationUrl = '/addDestination/';

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

function* callChangePassword(data) {
  const response = yield patchApi(changePasswordUrl, data);
  const responseData = yield response.status === 200 || response.status === 201
    ? response.data
    : {};
  return responseData;
}

function* callGetAllTrip() {
  const response = yield getApi(getAllTripUrl);
  const responseData = yield response.status === 200 || response.status === 201
    ? response.data
    : {};
  return responseData;
}

function* callCreateTrip(trip) {
  const response = yield userPostApi(postTripUrl, trip);
  const responseData = yield response.status === 200 || response.status === 201
    ? response.data
    : {};
  return responseData;
}

function* callEditTrip(tripId, newTrip) {
  const response = yield secondPatchApi(editTripUrl, tripId, newTrip);
  const responseData = yield response.status === 200 || response.status === 201
    ? response.data
    : {};
  return responseData;
}

function* callJoinTrip(tripId) {
  const response = yield thirdPatchApi(joinTripUrl, tripId);
  const responseData = yield response.status === 200 || response.status === 201
    ? response.data
    : {};
  return responseData;
}

function* callGetMemberInfo(username) {
  const response = yield secondGetApi(getMemberInfoUrl, username);
  const responseData = yield response.status === 200 || response.status === 201
    ? response.data
    : {};
  return responseData;
}

function* callAddDestination(destination) {
  let lastAddDestinationUrl = addDestinationUrl + destination.groupId;
  const response = yield userPostApi(lastAddDestinationUrl, destination);
  const responseData = yield response.status === 200 || response.status === 201
    ? response.data
    : {};
  return responseData;
}

function* callEditDestination(destination) {
  let lastAddDestinationUrl = editDestinationUrl + destination.groupId;
  const response = yield secondPatchApi(lastAddDestinationUrl, destination);
  const responseData = yield response.status === 200 || response.status === 201
    ? response.data
    : {};
  return responseData;
}

export const Api = {
  callLogin,
  callRegister,
  callChangePersonalInformation,
  callChangePassword,
  callGetAllTrip,
  callCreateTrip,
  callEditTrip,
  callJoinTrip,
  callGetMemberInfo,
  callAddDestination,
  callEditDestination,
};
