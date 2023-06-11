import { Component, Input, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { WorkExperienceInterface } from 'src/app/services/interfaces/WorkExperienceInterface';
import { WorkExperienceService } from 'src/app/services/workExperience/work-experience.service';

@Component({
  selector: 'app-edit-work-experience-modal',
  templateUrl: './edit-work-experience-modal.component.html',
  styleUrls: ['./edit-work-experience-modal.component.scss']
})
export class EditWorkExperienceModalComponent implements OnInit {
  @Input() workExperience!: WorkExperienceInterface;

  name!: string;
  enterprise!: string;
  description!: string;
  initialDate!: string;
  endDate!: string;
  country!: string;
  region!: string;
  city!: string;

  errorMessage: string = "";
  loading: boolean = false;

  constructor(private workExperienceService: WorkExperienceService) { }

  ngOnInit(): void {
    let modal = document.getElementById("editWorkExperienceModal")
    modal?.setAttribute("id", "editWorkExperienceModal" + this.workExperience.id);
  }

  onEditWorkExperience() {
    if (this.validForm()) {
      this.loading = true;
      this.workExperienceService.updateExperience({
        id: this.workExperience.id,
        name: this.name,
        enterprise: this.enterprise,
        description: this.description,
        initialDate: this.initialDate,
        endDate: this.endDate,
        country: this.country,
        region: this.region,
        city: this.city
      }).pipe(
        catchError((err) => {
          this.loading = false;
          this.errorMessage = "An error has ocurred"
          throw err;
        })).subscribe((response: WorkExperienceInterface) => {
          this.loading = false;
          this.workExperience = response;
          window.location.reload();
        });
    } else {
      this.loading = false;
      this.errorMessage = "Please, fill all the fields"
    }
  }

  validForm(): boolean {
    return this.name && this.enterprise && this.description && this.initialDate && this.endDate && this.country && this.region && this.city ? true : false;
  }
}
