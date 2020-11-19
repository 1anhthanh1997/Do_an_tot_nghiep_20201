import axios from 'axios';

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
  const response = await axios({
    method: 'post',
    url: localUrl + lastUrl,
    data: data,
  });
  // const responseData = response.data;
  console.log(response);
  return response;
};

export {getApi, postApi};
