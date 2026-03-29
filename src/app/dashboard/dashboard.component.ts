import { Component } from '@angular/core';
import { BarChartComponent } from "../bar-chart/bar-chart.component";
import { PieChartComponent } from "../pie-chart/pie-chart.component";
import { HalfDonutComponent } from "../half-donut/half-donut.component";
import { HorizontalBarChartComponent } from "../horizontal-bar-chart/horizontal-bar-chart.component";
import { PrintService } from '../services/print.service';
import { AdminTableComponent } from '../admin-table/admin-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminTableComponent, BarChartComponent, PieChartComponent, HalfDonutComponent, HorizontalBarChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private readonly printService: PrintService) { }

  printDashboard() {
    this.printService.print();
  }
}
