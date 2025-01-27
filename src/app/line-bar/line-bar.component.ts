import { Component } from '@angular/core';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-line-bar',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './line-bar.component.html',
  styleUrl: './line-bar.component.css',
  providers: [
      {
        provide: NGX_ECHARTS_CONFIG,
        useFactory: () => ({ echarts: () => import('echarts') }),
      },
    ],
})
export class LineBarComponent {
  chartOptions: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };
}
