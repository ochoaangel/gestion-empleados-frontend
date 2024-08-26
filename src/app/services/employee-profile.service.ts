import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { EmployeeProfileModel } from '../models/employee-profile.model'
import { environment } from '../../../environments.prod'

@Injectable({
  providedIn: 'root',
})
export class EmployeeProfileService {
  constructor(private http: HttpClient) {}

  getProfile(id: string): Observable<EmployeeProfileModel> {
    return this.http.get<EmployeeProfileModel>(
      `${environment.apiUrl}/usuarios/${id}`,
    )
  }

  updateProfile(id: string, profile: EmployeeProfileModel): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/usuarios/${id}`, profile)
  }
}
