import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_STORAGE} from '../constants';

// const baseUrl = 'https://open-drone-map.herokuapp.com';
const baseUrl = 'http://192.168.55.108:3000';
// const baseUrl = 'http://192.168.43.182:3000';

const getApi = async (lastUrl) => {
  const token = await AsyncStorage.getItem(ASYNC_STORAGE.ACCESS_TOKEN);
  // await console.log(token);
  // await console.log(baseUrl + lastUrl);
  const response = await axios({
    method: 'get',
    url: baseUrl + lastUrl,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return response;
};

const secondGetApi = async (lastUrl, id) => {
  const token = await AsyncStorage.getItem(ASYNC_STORAGE.ACCESS_TOKEN);
  // await console.log(token);
  // await console.log(baseUrl + lastUrl);
  const response = await axios({
    method: 'get',
    url: baseUrl + lastUrl + id,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return response;
};

const postApi = async (lastUrl, data) => {
  console.log(data);
  const response = await axios({
    method: 'post',
    url: baseUrl + lastUrl,
    data: data,
  });
  // const responseData = response.data;
  // console.log(response);
  return response;
};

const userPostApi = async (lastUrl, data) => {
  console.log(data);
  const token = await AsyncStorage.getItem(ASYNC_STORAGE.ACCESS_TOKEN);
  const response = await axios({
    method: 'post',
    url: baseUrl + lastUrl,
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data: data,
  });
  // const responseData = response.data;
  // console.log(response);
  return response;
};

const uploadImagePostApi = async (lastUrl, data) => {
  // console.log(data);
  // const token = await AsyncStorage.getItem(ASYNC_STORAGE.ACCESS_TOKEN);
  // console.log(baseUrl + lastUrl);
  console.log(data);
  const response = await axios({
    method: 'post',
    url: baseUrl + lastUrl,
    headers: {
      // Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
      'Accept-Control-Allow-Origin': '*',
    },
    data: data,
  });
  // const responseData = response.data;
  // console.log(response);
  return response;
};

const patchApi = async (lastUrl, data) => {
  console.log('ok');
  const token = await AsyncStorage.getItem(ASYNC_STORAGE.ACCESS_TOKEN);
  console.log('ok_2');
  console.log(token);
  const header = {
    Authorization: 'Bearer ' + token,
  };
  console.log(data);
  const response = await axios({
    method: 'patch',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    url: baseUrl + lastUrl,
    data: data,
  });
  // const responseData = response.data;
  // console.log(response);
  return response;
};

const secondPatchApi = async (lastUrl, id, data) => {
  const token = await AsyncStorage.getItem(ASYNC_STORAGE.ACCESS_TOKEN);
  // const header = {
  //   Authorization: 'Bearer ' + token,
  // };
  let fullUrl = baseUrl + lastUrl + id;
  console.log(fullUrl);
  console.log(data);
  const response = await axios({
    method: 'patch',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    url: fullUrl,
    data: data,
  });
  return response;
};

const thirdPatchApi = async (lastUrl, id) => {
  const token = await AsyncStorage.getItem(ASYNC_STORAGE.ACCESS_TOKEN);
  // const header = {
  //   Authorization: 'Bearer ' + token,
  // };
  let fullUrl = baseUrl + lastUrl + id;
  console.log(fullUrl);
  const response = await axios({
    method: 'patch',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    url: fullUrl,
  });
  return response;
};

export {
  getApi,
  secondGetApi,
  postApi,
  userPostApi,
  patchApi,
  secondPatchApi,
  thirdPatchApi,
  uploadImagePostApi,
};
