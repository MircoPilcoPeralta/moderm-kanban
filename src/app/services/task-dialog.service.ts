import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskDialogService {
  public readonly isDialogOpen = signal(false);

  public openDialog(): void {
    this.isDialogOpen.set(true);
  }

  public closeDialog(): void {
    this.isDialogOpen.set(false);
  }
}
