import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICustomer } from '../../interfaces/customer.model';

export const AdminTableActions = createActionGroup ({
  source: 'Admin Table',
  events: {
    'Load Customers': emptyProps(),
    'Load Customers Success': props<{ customers: ICustomer[] }>(),
    'Load Customers Failure': props<{ error: string }>(),

    'Check Customer Table Access': emptyProps(),
    'Check Customer Table Access Success': props<{ hasAccess: boolean }>(),
    'Check Customer Table Access Failure': props<{ error: string }>(),

    'Open Modal': emptyProps(),
    'Close Modal': emptyProps(),

    'Confirm Show All Customers': emptyProps(),
    'Confirm Show All Customers Success': emptyProps(),
    'Confirm Show All Customers Failure': props<{ error: string }>(),

    'Reset User Access': emptyProps(),
    'Reset User Access Success': emptyProps(),
    'Reset User Access Failure': props<{ error: string }>(),

    'Set Filter': props<{ filter: string }>(),
  },
});
