import { NgModule } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { CheckboxModule } from 'primeng/checkbox'
import { CardModule } from 'primeng/card'
import { MessagesModule } from 'primeng/messages'
import { MessageModule } from 'primeng/message'

@NgModule({
  exports: [
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    CardModule,
    MessagesModule,
    MessageModule,
  ],
})
export class PrimeNgModule {}
