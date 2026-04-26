import { Component, Input } from '@angular/core';
import { Customer } from '../../../interfaces/customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-table.component.html',
  styleUrl: './content-table.component.scss'
})
export class ContentTableComponent {
  @Input() customers: Customer[] = [];
}
