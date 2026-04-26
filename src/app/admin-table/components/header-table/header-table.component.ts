import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-table',
  standalone: true,
  imports: [],
  templateUrl: './header-table.component.html',
  styleUrl: './header-table.component.scss'
})
export class HeaderTableComponent {
  @Input() showButton = false;
  @Output() eventSeeAll = new EventEmitter<void>();

  onSeeAllCustomers() {
    this.eventSeeAll.emit();
  }
}
