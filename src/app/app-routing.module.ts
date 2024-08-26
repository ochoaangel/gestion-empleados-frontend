import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './features/auth/login/login.component'
import { EmployeeProfileComponent } from './features/employee-profile/employee-profile.component'
// import { EmployeeListComponent } from './features/employee-list/employee-list.component';
// import { EmployeeProfileComponent } from './features/employee-profile/employee-profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: EmployeeProfileComponent },
  // {
  // path: '',
  //   canActivate: [AuthGuard],
  // children: [
  //     {
  //       path: 'dashboard',
  //       component: DashboardComponent,
  //       canActivate: [RoleGuard],
  //       children: [
  //         { path: 'employees', component: EmployeeListComponent },
  //         { path: 'hiring', component: HiringComponent },
  //         { path: '', redirectTo: 'employees', pathMatch: 'full' }
  //       ]
  //     },
  //     { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  //   ],
  // },
  { path: '**', redirectTo: 'profile' },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
