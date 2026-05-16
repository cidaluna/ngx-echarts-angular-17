import { createReducer, on } from '@ngrx/store';
import { ICustomerState } from '../../interfaces/customer.model';
import { AdminTableActions } from './admin-table.actions';

export const ADMIN_TABLE_KEY = 'adminTable';
export const DEFAULT_VISIBLE_LIMIT = 10;

export const initialState: ICustomerState = {
  customers: [],
  loading: false,
  error: null,
  showModal: false,
  filter: '',
  hasConfirmedPurchase: false,
}

export const adminTableReducer = createReducer (
  initialState,

  on(AdminTableActions.loadCustomers, (state): ICustomerState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AdminTableActions.loadCustomersSuccess, (state, { customers }): ICustomerState => ({
    ...state,
    customers,
    loading: false,
    error: null,
  })),

  on(AdminTableActions.loadCustomersFailure, (state, { error }): ICustomerState => ({
    ...state,
    loading: false,
    error,
  })),

  on(AdminTableActions.openModal, (state): ICustomerState => ({
    ...state,
    showModal: true,
  })),

  on(AdminTableActions.closeModal, (state): ICustomerState => ({
    ...state,
    showModal: false
  })),

  on(AdminTableActions.confirmShowAllCustomers, (state): ICustomerState => ({
    ...state,
    hasConfirmedPurchase: true,
    showModal: false,
  })),

  on(AdminTableActions.setFilter, (state, { filter }): ICustomerState => ({
    ...state,
    filter,
  }))
);
