import { Component, OnInit, ViewChild } from '@angular/core'
import { Table } from 'primeng/table'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EmployeeProfileService } from '../../services/employee-profile.service'
import {
  DropDownInterface,
  EmployeeDetailModel,
} from '../../models/employee-profile.model'
import { AuthService } from '../../services/auth.service'
import { TableLazyLoadEvent } from 'primeng/table'

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

  loadEmployees(event: TableLazyLoadEvent) {
    this.loading = true
    const params = {
      pagina: (event.first ?? 0) / (event.rows ?? 10) + 1,
      limite: event.rows ?? 10,
      busqueda: event.globalFilter as string | undefined,
      sortField:
        event.sortField && typeof event.sortField === 'string'
          ? event.sortField
          : undefined,
      sortOrder: event.sortOrder === 1 ? 'asc' : 'desc',
    }

    this.employeeService.getEmployees(params).subscribe(
      (response) => {
        this.employees = response.docs
        this.totalRecords = response.totalDocs
        this.loading = false
      },
      (error) => {
        console.error('Error fetching employees', error)
        this.loading = false
      },
    )
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }

  getSeverity(status: string): 'success' | 'danger' | 'info' {
    switch (status) {
      case 'activo':
        return 'success'
      case 'baja':
        return 'danger'
      default:
        return 'info'
    }
  }

  editEmployee(employee: EmployeeDetailModel) {
    this.employeeForm.patchValue(employee)
    this.displayModal = true
  }

  deleteEmployee(employee: EmployeeDetailModel) {
    if (confirm('¿Está seguro de que desea eliminar este empleado?')) {
      this.employeeService.deleteEmployee(employee.id).subscribe(
        () => {
          this.loadEmployees({ first: 0, rows: 10 })
        },
        (error) => console.error('Error deleting employee', error),
      )
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employee: Partial<EmployeeDetailModel> = this.employeeForm.value
      const id = employee.id
      if (id) {
        this.employeeService.updateProfile(id, employee).subscribe(
          () => {
            this.displayModal = false
            this.loadEmployees({ first: 0, rows: 10 })
          },
          () => console.error('Error updating employee'),
        )
      }
    }
  }
}
