import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { WorkExperienceInterface } from '../interfaces/WorkExperienceInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {

  private baseUrl = environment.apiUrl;

  private getExperiencesUrl = this.baseUrl + '/auth/get/experiences/';
  private createExperienceUrl = this.baseUrl + '/auth/create/experience';
  private updateExperienceUrl = this.baseUrl + '/auth/update/experience/';
  private deleteExperienceUrl = this.baseUrl + '/auth/delete/experience/';

  constructor(private http: HttpClient) { }

  getExperiences(username: string): Observable<any> {
    return this.http.get(this.getExperiencesUrl + username, {
      withCredentials: true
    });
  }

  createExperience(experience: WorkExperienceInterface): Observable<WorkExperienceInterface> {
    return this.http.post<WorkExperienceInterface>(this.createExperienceUrl, experience, {
      withCredentials: true
    });
  }

  updateExperience(experience: WorkExperienceInterface): Observable<WorkExperienceInterface> {
    return this.http.put<WorkExperienceInterface>(`${this.updateExperienceUrl}${experience.id}`, experience, {
      withCredentials: true
    });
  }

  deleteExperience(id: number): Observable<any> {
    return this.http.delete(`${this.deleteExperienceUrl}${id}`, {
      withCredentials: true
    });
  }
}