import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICustomer } from '../../interfaces/customer.model';

export const AdminTableActions = createActionGroup ({
  source: 'Admin Table',
  events: {
    'Load Customers': emptyProps(),
    'Load Customers Success': props<{ customers: ICustomer[] }>(),
    'Load Customers Failure': props<{ error: string }>(),
    'Open Modal': emptyProps(),
    'Close Modal': emptyProps(),
    'Confirm Show All Customers': emptyProps(),
    'Set Filter': props<{ filter: string }>(),
  },
});
