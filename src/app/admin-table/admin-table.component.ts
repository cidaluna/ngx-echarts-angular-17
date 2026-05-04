import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Customer } from '../interfaces/customer.model';
import { CustomerService } from '../services/customer.service';
import { HeaderTableComponent } from './components/header-table/header-table.component';
import { ContentTableComponent } from './components/content-table/content-table.component';
import { ModalTableComponent } from './components/modal-table/modal-table.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [CommonModule, HeaderTableComponent, ContentTableComponent, ModalTableComponent],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss',
})
export class AdminTableComponent implements OnInit {
  private service = inject(CustomerService);

  allCustomers: Customer[] = [];
  visibleCustomers: Customer[] = [];

  loading = true;

  pageSize = 10; // número de linhas a mostrar por página
  currentPage = 1; // página atual
  viewMode: 'limited' | 'pagination' = 'pagination'; // modo de visualização

  isModalOpen = false;
  pendingShowAll = false; // controla intenção do usuário
  hasFullAccess = false; // indica se o usuário tem acesso total (assinatura ativa)

  ngOnInit() {
    this.loading = true;

    forkJoin({
      customers: this.service.getCustomers(),
      user: this.service.hasFullAccess()
    }).subscribe({
      next: ({ customers, user }) => {
        this.allCustomers = customers;
        this.hasFullAccess = user.hasFullAccess;

        this.updateVisibleCustomers();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  updateVisibleCustomers() {
    // 🔹 PAGINATION (independente de acesso)
    if (this.viewMode === 'pagination') {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const end = startIndex + this.pageSize;
      this.visibleCustomers = this.allCustomers.slice(startIndex, end);
      return;
    }

    // 🔹 LIMITED
    if (this.hasFullAccess) {
      // se já contratou → mostra tudo
      this.visibleCustomers = this.allCustomers;
    } else {
      // senão → mostra só 10
      this.visibleCustomers = this.allCustomers.slice(0, this.pageSize);
    }
  }


  onSeeAllCustormers() {
    // segurança: só funciona no modo correto
    if (this.viewMode !== 'limited') return;

    // se não tem mais dados, não faz nada
    if (!this.canShowAllCustomers) return;

    // já contratou → mostra tudo
    if (this.hasFullAccess) {
       this.updateVisibleCustomers();
      return;
    }

    // não contratou → abre modal
    this.isModalOpen = true;
    this.pendingShowAll = true;
  }

  onModalConfirm() {
     if (!this.pendingShowAll) return;

    this.loading = true;

    this.service.contractFullAccess().subscribe({
      next: () => {
        this.hasFullAccess = true; // importante atualizar estado local
        this.updateVisibleCustomers();
        this.resetModalState();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        // opcional: mostrar erro pro usuário
        console.error('Erro ao contratar serviço');
      }
    });
  }

  onModalClose() {
    // cancelou ou clicou fora
    this.resetModalState();
  }

  private resetModalState() {
    this.isModalOpen = false;
    this.pendingShowAll = false;
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

  // o botão "ver todos" só é mostrado se o modo atual for "limited"
  // e houver mais clientes do que o limite inicial, garantindo que o botão só apareça quando for relevante para o usuário.
  get canShowAllButton(): boolean {
    return this.viewMode === 'limited'
      && this.canShowAllCustomers;
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
