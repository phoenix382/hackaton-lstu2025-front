import { reactive } from 'vue';
// import axios from 'axios';
import api from '@/utils/axios';
import { jwtDecode } from 'jwt-decode';

const state = reactive({
  user: null,
  token: null,
  isAuthenticated: false
});

export const useAuthStore = () => {
  const initializeAuth = () => {
    const token = localStorage.getItem('jwt_token');
    if (token && isValidToken(token)) {
      state.token = token;
      state.isAuthenticated = true;
      state.user = jwtDecode(token);
      state.userId = 0;
      setAuthHeader(token);
    }
  };

  const isValidToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  const setAuthHeader = (token) => {
    api.defaults.headers.common['Authorization'] = `${token}`;
  };

  const register = async (credentials) => {
    try {
      const response = await api.post('/api/register', credentials);
      const { userID,token } = response.data;
      console.log(response.data);

      localStorage.setItem('jwt_token', token);
      setAuthHeader(token);
      state.token = token;
      state.isAuthenticated = true;
      state.user = jwtDecode(token);
      state.userId = userID;

      console.warn("remove in auth.js")
      console.log(state.user);
      console.log(state.token);

      return true;
    } catch (error) {
      return false;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post('/api/login', credentials);
      const { userID, token } = response.data;
      console.log(response.data);
      
      localStorage.setItem('jwt_token', token);
      setAuthHeader(token);
      state.token = token;
      state.isAuthenticated = true;
      state.user = jwtDecode(token);
      state.userId = userID;
      
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  const post = async (endpoint, data) => {
    console.log(state);
    try {
      const response = await api.post(endpoint, data);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const logout = () => {
    localStorage.removeItem('jwt_token');
    delete api.defaults.headers.common['Authorization'];
    state.token = null;
    state.isAuthenticated = false;
    state.user = null;
  };

  return {
    state,
    initializeAuth,
    login,
    register,
    logout,
    isValidToken,
    post
  };
};