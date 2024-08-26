import { Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  success(detail: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail })
  }

  info(detail: string): void {
    this.messageService.add({ severity: 'info', summary: 'Info', detail })
  }

  warn(detail: string): void {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail })
  }

  error(detail: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail })
  }

  contrast(detail: string): void {
    this.messageService.add({
      severity: 'contrast',
      summary: 'Contrast',
      detail,
    })
  }

  secondary(detail: string): void {
    this.messageService.add({
      severity: 'secondary',
      summary: 'Secondary',
      detail,
    })
  }
}
