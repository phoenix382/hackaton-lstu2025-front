import { reactive } from 'vue';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

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
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const login = async (credentials) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(apiUrl+'/api/login', credentials);
      const { token } = response.data;
      
      localStorage.setItem('jwt_token', token);
      setAuthHeader(token);
      state.token = token;
      state.isAuthenticated = true;
      state.user = jwtDecode(token);
      
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    delete axios.defaults.headers.common['Authorization'];
    state.token = null;
    state.isAuthenticated = false;
    state.user = null;
  };

  return {
    state,
    initializeAuth,
    login,
    logout,
    isValidToken
  };
};