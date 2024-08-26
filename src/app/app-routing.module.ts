import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './features/auth/login/login.component'
import { EmployeeProfileComponent } from './features/employee-profile/employee-profile.component'
import { EmployeeListComponent } from './features/employee-list/employee-list.component'

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: EmployeeProfileComponent },
  { path: 'list', component: EmployeeListComponent },
  { path: '**', redirectTo: 'login' },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
