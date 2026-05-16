export interface ICustomer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  city: string;
  state: string;
  lastPurchase: Date;
  totalSpent: number;
  status: 'active' | 'inactive';
  priority: 'High' | 'Medium' | 'Low';
}

export interface ICustomerFilter {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  city: string;
  state: string;
  status: string;
  priority: string;
}

export interface ICustomerState {
  customers: ICustomer[];
  loading: boolean;
  error: string | null;
  showModal: boolean;
  filter: string;
  hasConfirmedPurchase: boolean;
  checkingAccess: boolean;
  loggedUserName: string | null;
}

export interface ICustomerTableAccess {
  id: number;
  userId: number;
  hasAccess: boolean;
  name: string;
}
