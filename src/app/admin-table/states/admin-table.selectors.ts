import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ADMIN_TABLE_KEY, DEFAULT_VISIBLE_LIMIT } from './admin-table.reducer';
import { ICustomer, ICustomerState } from '../../interfaces/customer.model';

export const selectAdminTableState = createFeatureSelector<ICustomerState>(ADMIN_TABLE_KEY);

export const selectCustomers = createSelector(
  selectAdminTableState,
  (state) => state.customers
);

export const selectLoggedUserName = createSelector(
  selectAdminTableState,
  (state) => state.loggedUserName
);

export const selectLoading = createSelector(
  selectAdminTableState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectAdminTableState,
  (state) => state.error
);

export const selectShowModal = createSelector(
  selectAdminTableState,
  (state) => state.showModal
);

export const selectFilter = createSelector(
  selectAdminTableState,
  (state) => state.filter
);

export const selectHasConfirmedPurchase = createSelector(
  selectAdminTableState,
  (state) => state.hasConfirmedPurchase
);

export const selectCustomersAllowedForSearch = createSelector(
  selectCustomers,
  selectHasConfirmedPurchase,
  (customers, hasConfirmedPurchase) => {
    if (hasConfirmedPurchase) {
      return customers;
    }
    return customers.slice(0, DEFAULT_VISIBLE_LIMIT);
  }
);

// Seletor de filtro
export const selectVisibleCustomers = createSelector (
  selectCustomersAllowedForSearch,
  selectFilter,
  (customersAllowedForSearch: ICustomer[], filter: string): ICustomer[] => {
    const normalizeFilter = filter.trim().toLowerCase();

    if (!normalizeFilter) return customersAllowedForSearch;

    return customersAllowedForSearch.filter((customer) => [
      customer.name,
      customer.email,
      customer.phone,
      customer.company,
      customer.role,
      customer.city,
      customer.state,
      customer.status,
      customer.priority,
    ]
    .join(' ')
    .toLowerCase()
    .includes(normalizeFilter)
  );
  }
);

export const selectTotalCustomers = createSelector(
  selectCustomers,
  (customers) => customers.length
);

export const selectVisibleCustomersCount = createSelector(
  selectVisibleCustomers,
  (customers) => customers.length
);

export const selectHasMoreCustomersToShow = createSelector(
  selectCustomers,
  selectHasConfirmedPurchase,
  (customers, hasConfirmedPurchase) =>
    !hasConfirmedPurchase && customers.length > DEFAULT_VISIBLE_LIMIT
)

export const selectHeaderDescription = createSelector(
  selectVisibleCustomersCount,
  selectTotalCustomers,
  selectHasConfirmedPurchase,
  (visibleCustomersCount, totalCustomers, hasConfirmedPurchase) => {
    if (hasConfirmedPurchase) {
      return `Exibindo ${visibleCustomersCount} de ${totalCustomers} clientes.`
    }
    return `Exibindo ${visibleCustomersCount} de ${DEFAULT_VISIBLE_LIMIT} clientes liberados.`
  }
);

export const selectUserAccessLabel = createSelector(
  selectLoggedUserName,
  selectHasConfirmedPurchase,
  (loggedUserName, hasConfirmedPurchase): string => {
    if (!loggedUserName) {
      return 'Nenhum usuário logado.'
    }
    return hasConfirmedPurchase
    ? `${loggedUserName} possui acesso completo.`
    : `${loggedUserName} possui acesso limitado!`
  }
)
