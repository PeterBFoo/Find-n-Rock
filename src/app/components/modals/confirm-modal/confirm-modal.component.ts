import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Input() buttonText!: string;
  @Input() bodyText!: string;
  @Output() confirmEvent = new EventEmitter<void>();

  confirm() {
    this.confirmEvent.emit();
  }
}
