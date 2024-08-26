import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { LoginModel, LoginResponse } from '../models/login.model'
import { jwtDecode } from 'jwt-decode'
import { TokenPayload } from '../../../token-payload.model'
import { environment } from '../../../environments.prod'
import { Router } from '@angular/router'
import { ToastService } from './toast.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userToken: TokenPayload | null = null

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastService,
  ) {}

  login(credentials: LoginModel): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/usuarios/login`, credentials)
      .pipe(
        tap((response: LoginResponse) => {
          console.log('llegamos a acá.......')
          localStorage.setItem('token', response.token)
          this.decodeAndStoreToken(response.token)
        }),
        catchError(this.handleError),
      )
  }

  refreshToken(): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/api/refresh-token`, {})
  }

  decodeAndStoreToken(token: string): void {
    this.userToken = jwtDecode<TokenPayload>(token)
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!'
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`
    } else {
      // Backend error
      if (error.status === 401) {
        errorMessage = 'Credenciales inválidas'
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
      }
    }
    return throwError(errorMessage)
  }

  public logout(): void {
    localStorage.removeItem('token')
    this.userToken = null
    this.router.navigate([''])
    this.toast.success('Has Cerrado sesión satisfactoriamente !!')
  }
}
