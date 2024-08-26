import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EmployeeProfileService } from '../../services/employee-profile.service'
import { AuthService } from '../../services/auth.service'
import { EmployeeProfileModel } from '../../models/employee-profile.model'
import { ToastService } from '../../services/toast.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
})
export class EmployeeProfileComponent implements OnInit {
  form!: FormGroup
  rol!: string

  nombreEmpleado: string = ''
  titulo: string = ''

  puestosTrabajo = [
    { label: 'Full-stack developer', value: 'full-stack developer' },
    { label: 'Front-end developer', value: 'front-end developer' },
    { label: 'Sw admin', value: 'sw admin' },
    { label: 'Help desk', value: 'help desk' },
    { label: 'Scrum master', value: 'scrum master' },
    { label: 'Product manager', value: 'product manager' },
  ]

  tiposContrato = [
    { label: 'Tiempo Completo', value: 'Tiempo Completo' },
    { label: 'Medio Tiempo', value: 'Medio Tiempo' },
    { label: 'Contrato', value: 'Contrato' },
  ]

  constructor(
    private fb: FormBuilder,
    private profileService: EmployeeProfileService,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const userId = this.authService.userToken?.id
    if (userId) {
      this.profileService.getProfile(userId).subscribe((profile) => {
        profile.fechaNacimiento = new Date(profile.fechaNacimiento)
        profile.fechaInicioContrato = new Date(profile.fechaInicioContrato)
        this.form.patchValue(profile)
      })
    } else {
      this.authService.logout()
      this.router.navigate([''])
    }

    const disabled = this.authService.userToken?.rol === 'empleado'
    this.form = this.fb.group({
      email: [{ value: '', disabled }, [Validators.required, Validators.email]],
      nombre: [{ value: '', disabled }, Validators.required],
      apellido: [{ value: '', disabled }, Validators.required],
      fechaNacimiento: [{ value: '', disabled }, Validators.required],
      puestoTrabajo: ['', Validators.required],
      tipoContrato: [{ value: '', disabled }, Validators.required],
      fechaInicioContrato: [{ value: '', disabled }, Validators.required],
    })
  }

  saveProfile(): void {
    if (this.form.valid) {
      const userId = this.authService.userToken?.id
      if (userId) {
        const profileData: EmployeeProfileModel = {
          id: userId,
          ...this.form.value,
        }
        this.profileService.updateProfile(userId, profileData).subscribe({
          next: () => {
            this.toast.success('Se actualizó el perfil Correctamente')
          },
          error: () => {
            this.toast.error(
              'Hubo un error actualizando el perfil, intente nuevamente.',
            )
          },
        })
      }
    }
  }
}
