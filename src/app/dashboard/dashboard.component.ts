import { Component } from '@angular/core';
import { BarChartComponent } from "../bar-chart/bar-chart.component";
import { LineBarComponent } from "../line-bar/line-bar.component";
import { PieChartComponent } from "../pie-chart/pie-chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BarChartComponent, LineBarComponent, PieChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
