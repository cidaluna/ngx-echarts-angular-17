import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Customer } from '../interfaces/customer.model';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss'
})
export class AdminTableComponent {

  public customers = signal<Customer[]>([
    {
      id: 1,
      name: 'Luciana Oliveira',
      email: 'luciana.oliveira.1987@company.com',
      phone: '(11) 98877-6655',
      company: 'SoftPlan Tech',
      role: 'Tech Lead',
      city: 'São Paulo',
      state: 'SP',
      lastPurchase: new Date('2024-03-10'),
      totalSpent: 12550,
      status: 'active',
      priority: 'High'
    },
    {
      id: 2,
      name: 'Marcos Pontes',
      email: 'm.pontes@logistics.com',
      phone: '(21) 97766-5544',
      company: 'Logix Express',
      role: 'Operations Manager',
      city: 'Rio de Janeiro',
      state: 'RJ',
      lastPurchase: new Date('2024-02-25'),
      totalSpent: 4200,
      status: 'inactive',
      priority: 'Medium'
    }
  ]);
}
