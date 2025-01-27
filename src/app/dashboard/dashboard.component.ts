import { Component } from '@angular/core';
import { BarChartComponent } from "../bar-chart/bar-chart.component";
import { LineBarComponent } from "../line-bar/line-bar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BarChartComponent, LineBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
