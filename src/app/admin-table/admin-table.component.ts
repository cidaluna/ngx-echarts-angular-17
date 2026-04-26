import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Customer } from '../interfaces/customer.model';
import { CustomerService } from '../services/customer.service';
import { HeaderTableComponent } from './components/header-table/header-table.component';
import { ContentTableComponent } from './components/content-table/content-table.component';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [CommonModule, HeaderTableComponent, ContentTableComponent],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss',
})
export class AdminTableComponent implements OnInit {
  private service = inject(CustomerService);

  allCustomers: Customer[] = [];
  visibleCustomers: Customer[] = [];

  loading = true;
  limit = 10;
  showAll = false; // controla se deve mostrar todos ou apenas o limite inicial

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

  // atualiza a lista de clientes visíveis com base no estado de showAll
  updateVisible() {
    if (this.showAll) {
      this.visibleCustomers = this.allCustomers;
    } else {
      this.visibleCustomers = this.allCustomers.slice(0, this.limit);
    }
  }

  // o output do header-table chama esse método para mostrar todos os clientes
  // ou seja, quando clicado em "ver todos", showAll é setado para true e a lista visível é atualizada para mostrar tudo
  onSeeAllCustormers() {
    this.showAll = true;
    this.updateVisible();
  }

  // serve para mostrar o botão "ver todos" apenas se tiver mais clientes do que o limite inicial
  get canShowAllCustomers(): boolean {
    return this.allCustomers.length > this.limit;
  }
}
