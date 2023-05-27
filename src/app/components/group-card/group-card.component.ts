import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/services/interfaces/UserInterface';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss']
})
export class GroupCardComponent {
  @Input() suscriber!: User;
  @Output() selectCandidateEvent = new EventEmitter<string>()
  @Output() unselectCandidateEvent = new EventEmitter<string>()
  isCandidateSelected: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.suscriber);
  }

  onSelectCandidate() {
    this.isCandidateSelected = !this.isCandidateSelected;

    if (this.isCandidateSelected) {
      this.selectCandidateEvent.emit(this.suscriber.username);
    } else {
      this.unselectCandidateEvent.emit(this.suscriber.username);
    }

  }

}
