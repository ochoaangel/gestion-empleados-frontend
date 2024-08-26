export interface EmployeeProfileModel {
  id: string
  email: string
  nombre: string
  apellido: string
  fechaNacimiento: Date
  puestoTrabajo: string
  tipoContrato: string
  fechaInicioContrato: Date
}

export interface EmployeeDetailModel {
  id: string
  email: string
  nombre: string
  apellido: string
  fechaNacimiento: Date
  puestoTrabajo: string
  tipoContrato: string
  fechaInicioContrato: Date
  status: 'activo' | 'baja'
}

export interface DropDownInterface {
  label: string
  value: string
}

export interface Employee {
  id?: number
  name?: string
  position?: string
  data?: Employee[]
  total?: number
}

export interface EmployeeResponse {
  data?: Employee[]
  total?: number
}

export interface Params {
  [key: string]: string | number | boolean
}
