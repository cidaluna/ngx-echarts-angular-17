import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-table',
  standalone: true,
  imports: [],
  templateUrl: './modal-table.component.html',
  styleUrl: './modal-table.component.scss'
})
export class ModalTableComponent {
  title = 'Deseja contratar este serviço?';
  message = 'Este serviço será cobrado mensalmente, e você pode cancelar a qualquer momento.';
  @Input() isOpen: boolean = false;
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  close() {
    this.isOpen = false;
    this.closed.emit();
  }

  onCancel() {
    this.close();
  }

  onConfirm() {
    this.confirmed.emit();
    this.close();
  }

  onBackdropClick() {
    this.close(); // Fecha o modal ao clicar fora dele
  }
}
