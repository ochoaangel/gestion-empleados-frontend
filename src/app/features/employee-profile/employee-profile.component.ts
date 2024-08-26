// src/app/features/employee-profile/employee-profile.component.ts
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EmployeeProfileService } from '../../services/employee-profile.service'
import { EmployeeProfileModel } from '../../models/employee-profile.model'

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
})
export class EmployeeProfileComponent implements OnInit {
  form!: FormGroup

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
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      puestoTrabajo: ['', Validators.required],
      tipoContrato: ['', Validators.required],
      fechaInicio: ['', Validators.required],
    })
  }

  saveProfile(): void {
    if (this.form.valid) {
      const profileData: EmployeeProfileModel = this.form.value
      this.profileService.saveProfile(profileData)
    }
  }
}
