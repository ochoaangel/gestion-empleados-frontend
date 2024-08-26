import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { LoginModel } from '../models/login.model'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginModel): void {
    // Lógica para iniciar sesión
    console.log('Iniciando sesión con', credentials)
  }

  refreshToken(): Observable<string> {
    // Implementa la lógica para obtener un nuevo token
    return this.http.post<string>('/api/refresh-token', {})
  }
}
