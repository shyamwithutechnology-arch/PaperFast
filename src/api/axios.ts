// import axios from 'axios';
// import NetInfo from '@react-native-community/netinfo';
// import { localStorage } from '../storage/storage';
// import { showSnackbar } from '../utils/snackbar';

// const api = axios.create({
//   baseURL: 'https://www.papers.withupartners.in/api/',
//   timeout: 20000,
//   headers: {
//     Accept: 'application/json',
//     // 'Content-Type': 'application/json',
//   },
//   withCredentials: true, // 🔥 ADD THIS LINE
// });

// // ✅ REQUEST INTERCEPTOR (ONLY ONCE)
// api.interceptors.request.use(
//   async config => {
//     const net = await NetInfo.fetch();

//     if (!net.isConnected) {
//       showSnackbar('No internet connection', 'error');
//       return Promise.reject({ offline: true });
//     }

//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   error => Promise.reject(error)
// );

// export default api;

import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { localStorage } from '../storage/storage';
import { showSnackbar } from '../utils/snackbar';
const api = axios.create({
  baseURL: 'https://www.papers.withupartners.in/api/',
  timeout: 30000, // Increase timeout
  headers: {
    Accept: 'application/json',
    // DO NOT set Content-Type here
  },
});

// FIXED REQUEST INTERCEPTOR
api.interceptors.request.use(
  async config => {
    console.log('🚀 Request Interceptor - URL:', config.url);
    console.log('📦 Data is FormData?:', config.data instanceof FormData);
    
    // CRITICAL: For FormData, ensure proper headers
    if (config.data instanceof FormData) {
      // Remove any existing Content-Type to let axios set it
      delete config.headers['Content-Type'];
      delete config.headers['content-type'];
      
      // Log FormData contents
      if (config.data._parts) {
        console.log('📝 FormData parts:', config.data._parts);
      }
    }
    
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
  error => {
    console.log('❌ Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);
export default api;