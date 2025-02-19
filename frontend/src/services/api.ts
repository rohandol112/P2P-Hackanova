import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
};

export const loanAPI = {
  getLoans: () => api.get('/loans'),
  getLoanById: (id: string) => api.get(`/loans/${id}`),
  createLoan: (loanData: any) => api.post('/loans', loanData),
  investInLoan: (loanId: string, amount: number) =>
    api.post(`/loans/${loanId}/invest`, { amount }),
};

export default api; 