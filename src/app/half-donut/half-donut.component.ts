import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-half-donut',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './half-donut.component.html',
  styleUrl: './half-donut.component.css',
  providers: [
        {
          provide: NGX_ECHARTS_CONFIG,
          useFactory: () => ({ echarts: () => import('echarts') }),
        },
      ],
})
export class HalfDonutComponent {
  chartOptions: EChartsOption  = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        // adjust the start and end angle
        startAngle: 180,
        endAngle: 360,
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };
}
