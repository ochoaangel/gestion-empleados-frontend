import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ButtonModule, TableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
