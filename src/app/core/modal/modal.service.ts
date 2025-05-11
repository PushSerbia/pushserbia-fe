import { Injectable } from '@angular/core';
import { Modal } from 'flowbite';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: Record<string, Modal> = {};

  private getModal(modalId: string): Modal | null {
    if (this.modals[modalId]) {
      return this.modals[modalId];
    }
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      this.modals[modalId] = new Modal(modalElement);
      return this.modals[modalId];
    }
    console.error('Modal element not found:', modalId);
    return null;
  }

  open(modalId: string): void {
    const modal = this.getModal(modalId);
    if (modal) {
      modal.show();
    }
  }

  close(modalId: string): void {
    const modal = this.getModal(modalId);
    if (modal) {
      modal.hide();
    }
  }

  remove(modalId: string): void {
    if (this.modals[modalId]) {
      delete this.modals[modalId];
    }
  }
}
