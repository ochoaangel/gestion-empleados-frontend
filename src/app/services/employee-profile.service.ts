import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  EmployeedDetailModel,
  EmployeeResponse,
  Params,
} from '../models/employee-profile.model'

@Injectable({
  providedIn: 'root',
})
export class EmployeeProfileService {
  private apiUrl = 'api/employees'

  constructor(private http: HttpClient) {}

  getEmployees(params: Params): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(this.apiUrl, { params })
  }

  addEmployee(
    employee: EmployeedDetailModel,
  ): Observable<EmployeedDetailModel> {
    return this.http.post<EmployeedDetailModel>(this.apiUrl, employee)
  }

  updateEmployee(
    employee: EmployeedDetailModel,
  ): Observable<EmployeedDetailModel> {
    return this.http.put<EmployeedDetailModel>(
      `${this.apiUrl}/${employee.email}`,
      employee,
    )
  }

  deleteEmployee<T>(email: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${email}`)
  }
}
