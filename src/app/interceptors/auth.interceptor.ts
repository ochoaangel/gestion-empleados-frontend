import {
  HttpInterceptorFn,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http'
import { inject } from '@angular/core'
import { tap, catchError, switchMap, throwError } from 'rxjs'
import { AuthService } from '../services/auth.service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const token = localStorage.getItem('token')

  console.log('Interceptor ejecutado', req)

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req

  if (token) {
    authService.decodeAndStoreToken(token)
  }

  return next(authReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        console.log('Respuesta recibida', event)
        const newToken = event.headers.get('Authorization')
        if (newToken) {
          localStorage.setItem('token', newToken)
          authService.decodeAndStoreToken(newToken)
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.log('Error en la petición', error)
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((newToken: string) => {
            localStorage.setItem('token', newToken)
            authService.decodeAndStoreToken(newToken)
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
