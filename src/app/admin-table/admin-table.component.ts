import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Customer } from '../interfaces/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss',
})
export class AdminTableComponent implements OnInit {
  private service = inject(CustomerService);

  allCustomers: Customer[] = [];
  visibleCustomers: Customer[] = [];

  loading = true;

  limit = 10; // começa com 10

  ngOnInit() {
    this.service.getCustomers().subscribe({
      next: (data) => {
        this.allCustomers = data;
        this.updateVisible();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  updateVisible() {
    this.visibleCustomers = this.allCustomers.slice(0, this.limit);
  }

  verMais() {
    this.limit += 10;
    this.updateVisible();
  }

  get hasMore(): boolean {
    return this.limit < this.allCustomers.length;
  }
}
