export interface EmployeeProfileModel {
  email: string
  nombre: string
  apellido: string
  fechaNacimiento: Date
  puestoTrabajo: string
  tipoContrato: string
  fechaInicio: Date
}

export interface EmployeedDetailModel {
  email: string
  nombre: string
  apellido: string
  fechaNacimiento: Date
  puestoTrabajo: string
  tipoContrato: string
  fechaInicio: Date
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
