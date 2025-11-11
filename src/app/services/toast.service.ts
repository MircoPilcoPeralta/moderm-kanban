import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'loading' | 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public readonly toast = signal<Toast | null>(null);

  public showLoading(message: string): void {
    this.toast.set({ message, type: 'loading' });
  }

  public showSuccess(message: string): void {
    this.toast.set({ message, type: 'success' });
    this.autoDismiss();
  }

  public showError(message: string): void {
    this.toast.set({ message, type: 'error' });
    this.autoDismiss();
  }

  public dismiss(): void {
    this.toast.set(null);
  }

  private autoDismiss(): void {
    setTimeout(() => this.dismiss(), 3000);
  }
}
