// src/app/features/auth/login/auth.service.ts
import { Injectable } from '@angular/core'
import { LoginModel } from '../models/login.model'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(credentials: LoginModel): void {
    // Lógica para iniciar sesión
    console.log('Iniciando sesión con', credentials)
  }
}
