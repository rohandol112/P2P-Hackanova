export interface Loan {
  id: string;
  amount: number;
  termMonths: number;
  interestRate: number;
  purpose: string;
  status: 'pending' | 'active' | 'completed' | 'defaulted';
  borrowerId: string;
  lenderId?: string;
  riskScore: number;
  createdAt: string;
  currentBalance: number;
  repaymentSchedule: RepaymentSchedule[];
}

export interface RepaymentSchedule {
  dueDate: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
}

export interface LoanState {
  loans: Loan[];
  loading: boolean;
  error: string | null;
} 