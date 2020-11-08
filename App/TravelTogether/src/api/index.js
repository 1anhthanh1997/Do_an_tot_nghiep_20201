import axios from 'axios';

const baseUrl = 'https://open-drone-map.herokuapp.com';

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
    url: baseUrl + lastUrl,
    data: data,
  });
  const responseData = response.data;
  console.log(responseData);
  return response;
};

export {getApi, postApi};
