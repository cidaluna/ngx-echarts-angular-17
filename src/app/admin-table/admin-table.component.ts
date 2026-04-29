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
  //limit = 10;
  showAll = false; // controla se deve mostrar todos ou apenas o limite inicial

  pageSize = 10; // número de linhas a mostrar por página
  currentPage = 1; // página atual
  viewMode: 'limited' | 'all' | 'pagination' = 'pagination'; // modo de visualização

  ngOnInit() {
    this.service.getCustomers().subscribe({
      next: (data) => {
        this.allCustomers = data;
        this.updateVisibleCustomers();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // atualiza a lista de clientes visíveis com base no estado de showAll
  // updateVisible() {
  //   if (this.showAll) {
  //     this.visibleCustomers = this.allCustomers;
  //   } else {
  //     this.visibleCustomers = this.allCustomers.slice(0, this.limit);
  //   }
  // }

  updateVisibleCustomers() {
    if (this.viewMode === 'all') {
      this.visibleCustomers = this.allCustomers;
      return;
    }

    if(this.viewMode === 'pagination') {
      // calcula o índice inicial com base na página atual e no tamanho da página, e
      // depois extrai a fatia correspondente do array completo para mostrar apenas os clientes daquela página
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const end = startIndex + this.pageSize; // calcula o índice final para garantir que não ultrapasse o número total de clientes

      this.visibleCustomers = this.allCustomers.slice(startIndex, end);
      return;
    }
    // se o modo for 'limited', mostra apenas os primeiros clientes até o limite definido
    this.visibleCustomers = this.allCustomers.slice(0, this.pageSize);
  }

  // o output do header-table chama esse método para mostrar todos os clientes
  // ou seja, quando clicado em "ver todos", showAll é setado para true e a lista visível é atualizada para mostrar tudo
  onSeeAllCustormers() {
    this.viewMode = 'all';
    this.currentPage = 1; // reseta para a primeira página ao mudar para o modo "ver todos"
    this.updateVisibleCustomers();
  }

  // o metodo onChangePage é chamado quando o usuário clica em um número de página na paginação.
  // Ele atualiza o modo de visualização para "pagination", define a página atual e atualiza a lista de clientes visíveis para mostrar apenas os clientes daquela página específica.
  onChangePage(page: number): void {
    this.viewMode = 'pagination';
    this.currentPage = page;
    this.updateVisibleCustomers();
  }

  // serve para mostrar o botão "ver todos" apenas se existirem mais clientes do que o limite inicial
  // por exemplo, se o limite for 10 e houver 15 clientes, o botão aparecerá. Se houver apenas 8 clientes, o botão não aparecerá.
  get canShowAllCustomers(): boolean {
    return this.allCustomers.length > this.pageSize;
  }

  get canShowAllButton(): boolean {
    return this.viewMode === 'limited' && this.canShowAllCustomers;
  }

  // calcula o total de itens com base no array de dados completo, não apenas o visível
  get totalItems(): number {
    return this.allCustomers.length;
  }

  // calcula o total de páginas com base no número total de itens e no tamanho da página
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  // gera um array de números de página para exibir os botões de paginação
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
}
