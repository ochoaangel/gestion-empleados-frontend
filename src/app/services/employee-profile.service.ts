import { Injectable } from '@angular/core'
import { EmployeeProfileModel } from '../models/employee-profile.model'

@Injectable({
  providedIn: 'root',
})
export class EmployeeProfileService {
  saveProfile(profile: EmployeeProfileModel): void {
    // Lógica para guardar el perfil del empleado
    console.log('Perfil guardado:', profile)
  }
}
