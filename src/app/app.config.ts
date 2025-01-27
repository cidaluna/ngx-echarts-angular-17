import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideEchartsCore({echarts}),
  ]
};
