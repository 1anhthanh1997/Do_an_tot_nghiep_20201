import {
  LOGIN,
  REGISTER,
  CHANGE_PERSONAL_INFORMATION,
  CHANGE_PASSWORD,
  GET_ALL_TRIP,
  CREATE_TRIP,
  EDIT_TRIP,
  JOIN_TRIP,
  GET_MEMBER_INFO,
  ADD_DESTINATION,
  EDIT_DESTINATION,
  UPLOAD_IMAGE,
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

const uploadImage = (data) => {
  return {
    type: UPLOAD_IMAGE,
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

const getAllTrip = () => {
  return {
    type: GET_ALL_TRIP,
  };
};

const createTrip = (data) => {
  return {
    type: CREATE_TRIP,
    payload: data,
  };
};

const editTrip = (data) => {
  return {
    type: EDIT_TRIP,
    payload: data,
  };
};

const joinTrip = (data) => {
  return {
    type: JOIN_TRIP,
    payload: data,
  };
};

const getMemberInfo = (data) => {
  return {
    type: GET_MEMBER_INFO,
    payload: data,
  };
};

const addDestination = (data) => {
  return {
    type: ADD_DESTINATION,
    payload: data,
  };
};

const editDestination = (data) => {
  return {
    type: EDIT_DESTINATION,
    payload: data,
  };
};

export {
  login,
  register,
  changePersonalInformation,
  uploadImage,
  changePassword,
  getAllTrip,
  createTrip,
  editTrip,
  joinTrip,
  getMemberInfo,
  addDestination,
  editDestination,
};
