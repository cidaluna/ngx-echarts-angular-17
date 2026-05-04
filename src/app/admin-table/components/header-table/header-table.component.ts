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

  // emite um evento para o componente pai quando o botão "ver todos" é clicado, permitindo que
  //  o componente pai responda a essa ação, como mostrar todos os clientes ou mudar o modo de visualização.
  onSeeAllCustomers() {
    this.eventSeeAll.emit();
  }
}
