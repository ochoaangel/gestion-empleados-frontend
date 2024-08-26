import { Component, OnInit, ViewChild } from '@angular/core'
import { LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EmployeeProfileService } from '../../services/employee-profile.service'
import {
  DropDownInterface,
  EmployeeDetailModel,
} from '../../models/employee-profile.model'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeDetailModel[] = []
  totalRecords: number = 0
  loading: boolean = true
  @ViewChild('dt') table!: Table

  employeeForm: FormGroup
  displayModal: boolean = false

  nombreEmpleado: string = 'Juan Pérez'
  titulo: string = 'Gerente de Ventas'

  // Agregamos estas propiedades
  statuses: DropDownInterface[] = [
    { label: 'Activo', value: 'activo' },
    { label: 'Baja', value: 'baja' },
  ]

  constructor(
    private employeeService: EmployeeProfileService,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.employeeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: [null, Validators.required],
      puestoTrabajo: ['', Validators.required],
      tipoContrato: ['', Validators.required],
      fechaInicioContrato: [null, Validators.required],
      status: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.loadEmployees({ first: 0, rows: 10 })
  }

  loadEmployees(event: LazyLoadEvent) {
    this.loading = true
    console.log(event)
    // const params = {
    //   first: event.first?.toString() || '0',
    //   rows: event.rows?.toString() || '10',
    //   sortField: event.sortField || '',
    //   sortOrder: event.sortOrder === 1 ? 'asc' : 'desc',
    //   filters: JSON.stringify(event.filters || {}),
    // }

    // this.employeeService.getEmployees(params).subscribe(
    //   () => {
    // console.log(response)
    // this.employees = response.data
    // this.totalRecords = response.total
    //   this.loading = false
    // },
    // () => {
    // console.error('Error fetching employees', error)
    //     this.loading = false
    //   },
    // )
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }

  showAddModal() {
    this.employeeForm.reset()
    this.displayModal = true
  }

  onSubmit() {
    // if (this.employeeForm.valid) {
    //   const employee: EmployeeDetailModel = this.employeeForm.value
    //   this.employeeService.addEmployee(employee).subscribe(
    //     () => {
    //       this.displayModal = false
    //       this.loadEmployees({ first: 0, rows: 10 })
    //     },
    //     (error) => console.error('Error adding employee', error),
    //   )
    // }
  }

  // Agregamos este método
  getSeverity(status: string): string {
    switch (status) {
      case 'activo':
        return 'success'
      case 'baja':
        return 'danger'
      default:
        return 'info'
    }
  }

  // // Métodos adicionales para editar y eliminar empleados (implementar según sea necesario)
  editEmployee(employee: EmployeeDetailModel) {
    //   // Implementar lógica de edición
    console.log('employee', employee)
  }

  deleteEmployee(employee: EmployeeDetailModel) {
    // Implementar lógica de eliminación
    console.log('employee', employee)
  }
}
