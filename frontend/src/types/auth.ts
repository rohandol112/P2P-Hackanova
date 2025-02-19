export interface User {
  id: string;
  email: string;
  username: string;
  role: 'borrower' | 'lender';
  isActive: boolean;
  creditScore?: number;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
} 