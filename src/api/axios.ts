import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { localStorage } from '../storage/storage';
import { showSnackbar } from '../utils/snackbar';

const api = axios.create({
  baseURL: 'https://www.papers.withupartners.in/api/',
  timeout: 20000,
  headers: {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

api.interceptors.request.use(
  async config => {
    const net = await NetInfo.fetch();

    if (!net.isConnected) {
      showSnackbar('No internet connection', 'error');
      return Promise.reject({ offline: true });
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
