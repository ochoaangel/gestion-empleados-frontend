import { Component, Input, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() nombreEmpleado: string = ''
  @Input() titulo: string = ''

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.userToken?.rol === 'usuario') {
      this.titulo = 'Gestion de Empresa - Lista de Empleados'
      this.nombreEmpleado = `${this.authService.userToken?.email}`
    } else {
      this.titulo = 'Gestion de Empresa - Perfil'
      this.nombreEmpleado = `${this.authService.userToken?.email}`
    }
  }

  cerrarSesion() {
    this.authService.logout()
  }
}
