import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_STORAGE} from '../constants';

const baseUrl = 'https://open-drone-map.herokuapp.com';
const localUrl = 'http://192.168.55.108:3000';

const getApi = async (lastUrl) => {
  const response = await axios({
    method: 'get',
    url: baseUrl + lastUrl,
    header: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {},
  });
  return response.json();
};

const postApi = async (lastUrl, data) => {
  console.log(data);
  const response = await axios({
    method: 'post',
    url: localUrl + lastUrl,
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
    url: localUrl + lastUrl,
    data: data,
  });
  // const responseData = response.data;
  // console.log(response);
  return response;
};

export {getApi, postApi, patchApi};
