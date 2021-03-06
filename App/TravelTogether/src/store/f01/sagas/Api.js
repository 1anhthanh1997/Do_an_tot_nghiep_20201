import {
  getApi,
  postApi,
  uploadImagePostApi,
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
const editDestinationUrl = '/editDestination/';
const uploadImageUrl = '/upload';

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

function* callUploadImage(data) {
  console.log('Call');
  // let data = {
  //   file: 'data:image/jpg;base64,' + response.data,
  //   upload_preset: "my_preset_name",
  // }

  const response = yield uploadImagePostApi(uploadImageUrl, data);
  console.log(response);
  const imageLink = yield response.status === 200 || response.status === 201
    ? response.data
    : null;
  return imageLink;
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
  // let lastAddDestinationUrl = editDestinationUrl + destination.groupId;
  // console.log(lastAddDestinationUrl);
  const response = yield secondPatchApi(
    editDestinationUrl,
    destination.groupId,
    destination,
  );
  const responseData = yield response.status === 200 || response.status === 201
    ? response.data
    : {};
  return responseData;
}

export const Api = {
  callLogin,
  callRegister,
  callChangePersonalInformation,
  callUploadImage,
  callChangePassword,
  callGetAllTrip,
  callCreateTrip,
  callEditTrip,
  callJoinTrip,
  callGetMemberInfo,
  callAddDestination,
  callEditDestination,
};
