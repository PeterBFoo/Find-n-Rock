import { Component } from '@angular/core';
import { WorkExperienceInterface } from 'src/app/services/interfaces/WorkExperienceInterface';
import { WorkExperienceService } from 'src/app/services/workExperience/work-experience.service';

@Component({
  selector: 'app-work-experience-modal',
  templateUrl: './work-experience-modal.component.html',
  styleUrls: ['./work-experience-modal.component.scss']
})
export class WorkExperienceModalComponent implements WorkExperienceInterface {
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

  onCreateWorkExperience() {
    if (this.validForm()) {
      this.loading = true;
      this.workExperienceService.createExperience({
        name: this.name,
        enterprise: this.enterprise,
        description: this.description,
        initialDate: this.initialDate,
        endDate: this.endDate,
        country: this.country,
        region: this.region,
        city: this.city
      }).subscribe((response: WorkExperienceInterface) => {
        this.loading = false;
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
