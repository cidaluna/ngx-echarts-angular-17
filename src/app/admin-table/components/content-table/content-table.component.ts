import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICustomer } from '../../../interfaces/customer.model';
import { CommonModule } from '@angular/common';
import { PriorityLabelPipe } from '../../../pipes/priority-label.pipe';

@Component({
  selector: 'app-content-table',
  standalone: true,
  imports: [CommonModule, PriorityLabelPipe],
  templateUrl: './content-table.component.html',
  styleUrl: './content-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentTableComponent {
  @Input({ required: true }) customers: ICustomer[] = [];
}
