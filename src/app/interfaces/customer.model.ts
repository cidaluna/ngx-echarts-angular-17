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
