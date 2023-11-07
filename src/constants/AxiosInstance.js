import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosInstance = (
  contentType = 'application/json' |
    'application/x-www-form-urlencoded' |
    'multipart/form-data',
) => {
  const axiosInstance = axios.create({
    baseURL: 'http://103.57.129.166:3000/',
  });
  axiosInstance.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('token');
      config.headers = {
        Authorizaztion: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': contentType,
      };
      return config;
    },
    err => Promise.reject(err),
  );
  axiosInstance.interceptors.response.use(
    res => res.data,
    err => Promise.reject(err),
  ); // callback
  return axiosInstance;
};

export default AxiosInstance;
