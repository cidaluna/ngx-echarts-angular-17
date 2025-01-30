import { Component } from '@angular/core';
import { BarChartComponent } from "../bar-chart/bar-chart.component";
import { PieChartComponent } from "../pie-chart/pie-chart.component";
import { HalfDonutComponent } from "../half-donut/half-donut.component";
import { HorizontalBarChartComponent } from "../horizontal-bar-chart/horizontal-bar-chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BarChartComponent, PieChartComponent, HalfDonutComponent, HorizontalBarChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
