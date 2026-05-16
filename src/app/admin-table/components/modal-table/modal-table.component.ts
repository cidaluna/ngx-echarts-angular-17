import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-table',
  standalone: true,
  imports: [],
  templateUrl: './modal-table.component.html',
  styleUrl: './modal-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalTableComponent {
  title = 'Deseja contratar este serviço?';
  message = 'Este serviço será cobrado mensalmente, e você pode cancelar a qualquer momento.';
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  // Confirma a contratação de todos os registros
  onConfirm() {
    this.confirm.emit();
  }

  // Cancela a contratação e fecha o modal
  onCancel() {
    this.cancel.emit();
  }
}
