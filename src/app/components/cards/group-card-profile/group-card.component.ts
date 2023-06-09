import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/services/interfaces/UserInterface';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss']
})
export class GroupCardComponent {
  @Input() user!: User;
  @Input() isSelectingCandidates!: boolean;
  @Output() selectCandidateEvent = new EventEmitter<string>()
  @Output() unselectCandidateEvent = new EventEmitter<string>()
  isCandidateSelected: boolean = false;

  constructor() { }

  onSelectCandidate() {
    this.isCandidateSelected = !this.isCandidateSelected;

    if (this.isCandidateSelected) {
      this.selectCandidateEvent.emit(this.user.username);
    } else {
      this.unselectCandidateEvent.emit(this.user.username);
    }

  }

}
