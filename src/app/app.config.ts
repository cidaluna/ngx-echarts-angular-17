import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ADMIN_TABLE_KEY, adminTableReducer } from './admin-table/states/admin-table.reducer';
import { AdminTableEffects } from './admin-table/states/admin-table.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideEchartsCore({echarts}),
    provideHttpClient(),
    provideStore({
      [ADMIN_TABLE_KEY]: adminTableReducer,
    }),
    provideEffects([AdminTableEffects]),
    provideStoreDevtools({ maxAge: 25 })
  ]
};
