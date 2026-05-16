import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { HeaderTableComponent } from './components/header-table/header-table.component';
import { ContentTableComponent } from './components/content-table/content-table.component';
import { ModalTableComponent } from './components/modal-table/modal-table.component';
import { Store } from '@ngrx/store';
import { AdminTableActions } from './states/admin-table.actions';
import { selectError, selectHeaderDescription, selectLoading, selectShowModal, selectVisibleCustomers, selectHasMoreCustomersToShow, selectUserAccessLabel } from './states/admin-table.selectors';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [AsyncPipe, HeaderTableComponent, ContentTableComponent, ModalTableComponent],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminTableComponent implements OnInit {
  private readonly store = inject(Store);

  customers$ = this.store.select(selectVisibleCustomers);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  showModal$ = this.store.select(selectShowModal);
  hasMoreCustomersToShow$ = this.store.select(selectHasMoreCustomersToShow);
  headerDescription$ = this.store.select(selectHeaderDescription);
  userAccessLabel$ = this.store.select(selectUserAccessLabel);

  // Carrega os clientes quando a tela é iniciada e consulta o direito de acesso
  ngOnInit(): void {
    this.store.dispatch(AdminTableActions.loadCustomers());
    this.store.dispatch(AdminTableActions.checkCustomerTableAccess());
  }

  // Atualiza o filtro digitado pelo usuário
  onFilterChange(filter: string): void {
    this.store.dispatch(AdminTableActions.setFilter({ filter}));
  }

  // Reseta o usuário de exemplo e remove o acesso a todos os registros da tabela
  onResetUserAccess(): void {
    this.store.dispatch(AdminTableActions.resetUserAccess());
  }

  // Abre modal de contratação
  onViewAll(): void {
    this.store.dispatch(AdminTableActions.openModal());
  }

  // Pai fecha o modal sem exibir todos os clientes
  onCancelModal() {
    this.store.dispatch(AdminTableActions.closeModal());
  }

  // Pai confirma a exibição/contratação de todos os clientes
  onConfirmModal() {
    this.store.dispatch(AdminTableActions.confirmShowAllCustomers());
  }
}
