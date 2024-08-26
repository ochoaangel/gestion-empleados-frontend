import { HttpInterceptorFn } from '@angular/common/http'
import { HttpResponse, HttpErrorResponse } from '@angular/common/http'
import { catchError, switchMap, tap } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { inject } from '@angular/core'
import { AuthService } from '../services/auth.service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const token = localStorage.getItem('token')

  // Clona la solicitud y agregar el token si existe
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req

  return next(authReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        const newToken = event.headers.get('Authorization')
        if (newToken) {
          localStorage.setItem('token', newToken)
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Maneja la renovación del token aquí
        return authService.refreshToken().pipe(
          switchMap((newToken: string) => {
            localStorage.setItem('token', newToken)
            const newAuthReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            })
            return next(newAuthReq)
          }),
        )
      }
      return throwError(error)
    }),
  )
}
