import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../../services/auth.service'
import { LoginModel } from '../../../models/login.model'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      loggedin: [false],
    })
  }

  login(): void {
    if (this.form.valid) {
      const loginData: LoginModel = this.form.value
      this.authService.login(loginData)
    }
  }

  recoverPassword(): void {
    // Lógica para recuperar contraseña
  }

  iniciarSesion() {
    console.log('Inicio De sesión')
    this.router.navigate(['profile'])
  }
}
