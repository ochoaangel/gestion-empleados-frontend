import { NgModule } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { CheckboxModule } from 'primeng/checkbox'
import { CardModule } from 'primeng/card'
import { MessagesModule } from 'primeng/messages'
import { MessageModule } from 'primeng/message'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CalendarModule } from 'primeng/calendar'

@NgModule({
  exports: [
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    CardModule,
    MessagesModule,
    MessageModule,
    DropdownModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
})
export class PrimeNgModule {}
