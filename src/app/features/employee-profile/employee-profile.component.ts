// src/app/features/employee-profile/employee-profile.component.ts
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EmployeeProfileService } from '../../services/employee-profile.service'
import { AuthService } from '../../services/auth.service'
// import { EmployeeProfileModel } from '../../models/employee-profile.model'

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
    { label: 'Desarrollador', value: 'Desarrollador' },
    { label: 'Diseñador', value: 'Diseñador' },
    { label: 'Gerente', value: 'Gerente' },
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
  ) {}

  ngOnInit(): void {
    const disabled =
      this.authService.userToken?.rol === 'empleado' ? true : false
    this.form = this.fb.group({
      email: [{ value: '', disabled }, [Validators.required, Validators.email]],
      nombre: [{ value: '', disabled }, Validators.required],
      apellido: [{ value: '', disabled }, Validators.required],
      fechaNacimiento: [{ value: '', disabled }, Validators.required],
      puestoTrabajo: ['', Validators.required],
      tipoContrato: [{ value: '', disabled }, Validators.required],
      fechaInicio: [{ value: '', disabled }, Validators.required],
    })
  }

  saveProfile(): void {
    if (this.form.valid) {
      // const profileData: EmployeeProfileModel = this.form.value
      console.log('Agregar funcionalidad..')
      // this.profileService.saveProfile(profileData)
    }
  }
}
