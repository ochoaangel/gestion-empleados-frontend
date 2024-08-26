import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './features/auth/login/login.component'
import { EmployeeProfileComponent } from './features/employee-profile/employee-profile.component'
import { EmployeeListComponent } from './features/employee-list/employee-list.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthService } from './services/auth.service'
import { PrimeNgModule } from './primeng/primeng.module'
import { EmployeeProfileService } from './services/employee-profile.service'
import { ToolbarComponent } from './shared/toolbar/toolbar.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeProfileComponent,
    EmployeeListComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
  ],
  providers: [AuthService, EmployeeProfileService],
  bootstrap: [AppComponent],
})
export class AppModule {}
