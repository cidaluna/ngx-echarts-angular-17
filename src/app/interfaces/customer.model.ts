export interface Customer {
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

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  visibleRows: number; //10 or all
  showModal: boolean;
  filter: string;
}
