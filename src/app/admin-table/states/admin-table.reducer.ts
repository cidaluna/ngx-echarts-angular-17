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
  checkingAccess: false,
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

  on(AdminTableActions.checkCustomerTableAccess, (state): ICustomerState => ({
    ...state,
    checkingAccess: true,
  })),

  on(AdminTableActions.checkCustomerTableAccessSuccess, (state, { hasAccess }): ICustomerState => ({
    ...state,
    checkingAccess: false,
    hasConfirmedPurchase: hasAccess,
  })),

  on(AdminTableActions.checkCustomerTableAccessFailure, (state, { error }): ICustomerState => ({
    ...state,
    checkingAccess: false,
    error,
  })),

  on(AdminTableActions.confirmShowAllCustomers, (state): ICustomerState => ({
    ...state,
    loading: false,
  })),

  on(AdminTableActions.confirmShowAllCustomersSuccess, (state): ICustomerState => ({
    ...state,
    loading: false,
    showModal: false,
    hasConfirmedPurchase: true,
  })),

  on(AdminTableActions.confirmShowAllCustomersFailure, (state, { error }): ICustomerState => ({
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
