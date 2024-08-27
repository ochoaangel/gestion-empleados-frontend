import { Component, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EmployeeProfileService } from '../../services/employee-profile.service'
import { AuthService } from '../../services/auth.service'
import {
  EmployeeDetailModel,
  EmployeeProfileModel,
} from '../../models/employee-profile.model'
import { ToastService } from '../../services/toast.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
})
export class EmployeeProfileComponent implements OnInit {
  @Input() employee!: EmployeeDetailModel
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
    private toast: ToastService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Determina si los campos deben estar deshabilitados
    const disabled = !this.employee

    // Configura el formulario con los valores iniciales y el estado de deshabilitado
    this.form = this.fb.group({
      email: [{ value: '', disabled }, [Validators.required, Validators.email]],
      nombre: [{ value: '', disabled }, Validators.required],
      apellido: [{ value: '', disabled }, Validators.required],
      fechaNacimiento: [{ value: '', disabled }, Validators.required],
      puestoTrabajo: ['', Validators.required],
      tipoContrato: [{ value: '', disabled }, Validators.required],
      fechaInicioContrato: [{ value: '', disabled }, Validators.required],
    })

    if (this.employee) {
      // Si hay un empleado, establece los valores del formulario
      setTimeout(() => {
        this.employee.fechaNacimiento = new Date(this.employee.fechaNacimiento)
        this.employee.fechaInicioContrato = new Date(
          this.employee.fechaInicioContrato,
        )
        this.form.patchValue(this.employee)
      })
      this.rol = 'usuario'
    } else {
      this.rol = 'empleado'
      // Si no hay un empleado, obtiene el perfil del usuario
      const userId = this.authService.userToken?.id
      if (userId) {
        this.profileService.getProfile(userId).subscribe((profile) => {
          profile.fechaNacimiento = new Date(profile.fechaNacimiento)
          profile.fechaInicioContrato = new Date(profile.fechaInicioContrato)
          this.form.patchValue(profile)
        })
      } else {
        // Si no hay un usuario, cierra sesión y redirige
        this.authService.logout()
        this.router.navigate([''])
      }
    }
  }

  saveProfile(): void {
    if (this.form.valid) {
      const profileData: EmployeeProfileModel = {
        ...this.employee,
        ...this.form.value,
      }
      console.log('updateProfile this.employee._id: ', this.employee._id)
      this.profileService
        .updateProfile(this.employee._id, profileData)
        .subscribe({
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
