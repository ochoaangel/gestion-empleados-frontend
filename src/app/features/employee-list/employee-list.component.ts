import { Component, OnInit, ViewChild } from '@angular/core'
import { Table } from 'primeng/table'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EmployeeProfileService } from '../../services/employee-profile.service'
import {
  DropDownInterface,
  EmployeeDetailModel,
} from '../../models/employee-profile.model'
import { TableLazyLoadEvent } from 'primeng/table'
import { ToastService } from '../../services/toast.service'
import { ConfirmationService } from 'primeng/api'
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

  statuses: DropDownInterface[] = [
    { label: 'Activo', value: 'activo' },
    { label: 'Baja', value: 'baja' },
  ]

  constructor(
    private confirmationService: ConfirmationService,
    private employeeService: EmployeeProfileService,
    private authService: AuthService,
    private toast: ToastService,
    private fb: FormBuilder,
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

  deleteEmployee(employee: EmployeeDetailModel, event: Event) {
    console.log(employee, event)
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Está seguro de que desea dar de baja a ${employee.nombre} ${employee.apellido} de email ${employee.email}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      acceptLabel: 'Si',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.employeeService.deleteEmployee(employee._id).subscribe(
          () => {
            this.toast.success('Empleado dado de baja satisfactoriamente')
            this.loadEmployees({ first: 0, rows: 10 })
          },
          (error) => {
            this.toast.warn('Error al dar de baja al empleado')
            console.error('Error deleting employee', error)
          },
        )
      },
      reject: () => {},
    })
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employee: Partial<EmployeeDetailModel> = this.employeeForm.value
      const id = employee._id
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
