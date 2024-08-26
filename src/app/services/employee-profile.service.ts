import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { EmployeeDetailModel } from '../models/employee-profile.model'
import { environment } from '../../../environments.prod'

export interface EmployeeResponse {
  docs: EmployeeDetailModel[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeProfileService {
  constructor(private http: HttpClient) {}

  getEmployees(params: {
    pagina?: number
    limite?: number
    busqueda?: string
    sortField?: string
    sortOrder?: string
  }): Observable<EmployeeResponse> {
    let httpParams = new HttpParams()
    if (params.pagina)
      httpParams = httpParams.set('pagina', params.pagina.toString())
    if (params.limite)
      httpParams = httpParams.set('limite', params.limite.toString())
    if (params.busqueda)
      httpParams = httpParams.set('busqueda', params.busqueda)
    if (params.sortField)
      httpParams = httpParams.set('sortField', params.sortField)
    if (params.sortOrder)
      httpParams = httpParams.set('sortOrder', params.sortOrder)

    return this.http.get<EmployeeResponse>(`${environment.apiUrl}/usuarios`, {
      params: httpParams,
    })
  }

  getProfile(id: string): Observable<EmployeeDetailModel> {
    return this.http.get<EmployeeDetailModel>(
      `${environment.apiUrl}/usuarios/${id}`,
    )
  }

  updateProfile(
    id: string,
    profile: Partial<EmployeeDetailModel>,
  ): Observable<EmployeeDetailModel> {
    return this.http.put<EmployeeDetailModel>(
      `${environment.apiUrl}/usuarios/${id}`,
      profile,
    )
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/usuarios/${id}`)
  }
}
