import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { catchError } from 'rxjs';
import { WorkExperienceInterface } from 'src/app/services/interfaces/WorkExperienceInterface';
import { WorkExperienceService } from 'src/app/services/workExperience/work-experience.service';

@Component({
  selector: 'app-work-experience-card',
  templateUrl: './work-experience-card.component.html',
  styleUrls: ['./work-experience-card.component.scss']
})
export class WorkExperienceCardComponent {
  @Input() workExperience!: WorkExperienceInterface;
  @Input() isOwner!: boolean;
  @ViewChild('editButton', { static: false }) editButton!: ElementRef;
  initialDateFormatted!: string;
  endDateFormatted!: string;

  constructor(private workExperienceService: WorkExperienceService) { }

  ngOnInit(): void {
    this.initialDateFormatted = this.formatDate(this.workExperience.initialDate.toString());
    this.endDateFormatted = this.formatDate(this.workExperience.endDate.toString());
  }

  ngAfterViewInit(): void {
    this.editButton.nativeElement.setAttribute("data-bs-target", "#editWorkExperienceModal" + this.workExperience.id);
  }

  formatDate(date: string): string {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
  }

  deleteWorkExperience() {
    this.workExperienceService.deleteExperience(this.workExperience.id!)
      .pipe(catchError((err) => {
        throw err;
      }))
      .subscribe(() => {
        window.location.reload();
      });
  }
}
