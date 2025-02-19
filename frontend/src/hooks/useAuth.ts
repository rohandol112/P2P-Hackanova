import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/index.ts';
import { login, logout, register } from '../store/slices/authSlice.ts';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      await dispatch(login(credentials)).unwrap();
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const handleRegister = async (userData: { email: string; password: string; username: string }) => {
    try {
      await dispatch(register(userData)).unwrap();
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login: handleLogin,
    logout: () => dispatch(logout()),
    register: handleRegister,
  };
}; 