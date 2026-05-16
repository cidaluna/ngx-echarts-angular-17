import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-table',
  standalone: true,
  imports: [],
  templateUrl: './header-table.component.html',
  styleUrl: './header-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderTableComponent {
  @Input({ required: true }) description = '';
  @Input() showViewAllButton = false;

  @Output() filterChange = new EventEmitter<string>();
  @Output() eventViewAll = new EventEmitter<void>();

  // Envia o texto digitado para o componente pai
  onFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filterChange.emit(input.value);
  }

  // emite um evento para o componente pai solicitando a abertura do modal
  onViewAll() {
    this.eventViewAll.emit();
  }
}
