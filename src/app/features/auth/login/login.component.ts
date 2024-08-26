import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../../services/auth.service'
import { LoginModel } from '../../../models/login.model'
import { Router } from '@angular/router'
import { ToastService } from '../../../services/toast.service'

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
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['opc.grecia@gmail.com', [Validators.required, Validators.email]],
      clave: [
        'opc.grecia@gmail.com',
        [Validators.required, Validators.minLength(6)],
      ],
      loggedin: [false],
    })
  }

  login(): void {
    if (this.form.valid) {
      const loginData: LoginModel = this.form.value
      delete loginData.loggedin

      console.log('loginData', loginData)
      this.authService.login(loginData).subscribe({
        next: () => {
          this.toast.success('Iniciastes sesión Correctamente')
          if (this.authService.userToken?.rol === 'usuario') {
            // this.router.navigate(['/list'])
            this.router.navigate(['/profile'])
          } else {
            this.router.navigate(['/profile'])
          }
        },
        error: () => {
          this.toast.error('Credenciales inválidas, intente nuevamente.')
        },
      })
    }
  }

  recoverPassword(): void {
    // Lógica para recuperar contraseña
  }
}
// {
//   "email": "opc.grecia@gmail.com",
//   "clave": "opc.grecia@gmail.com"
// }
