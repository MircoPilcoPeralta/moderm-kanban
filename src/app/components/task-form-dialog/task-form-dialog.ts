import { Component, ChangeDetectionStrategy, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Priority, Task } from '../../domain/task';
import { TasksFacade } from '../../services/facade/tasks-facade';

@Component({
  selector: 'app-task-form-dialog',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form-dialog.html',
  styleUrl: './task-form-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormDialog {
  private fb = inject(FormBuilder);

  private _tasksFacade = inject(TasksFacade);

  taskCreated = output<Task>();

  dialogClosed = output<void>();

  priorities: Priority[] = ['low', 'medium', 'high'];

  taskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    priority: ['medium', [Validators.required]],
    dueDate: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

      const newTask: Task = {
        title: formValue.title,
        description: formValue.description,
        priority: formValue.priority,
        dueDate: new Date(formValue.dueDate),
        id: crypto.randomUUID(),
        status: 'todo',
        createdAt: new Date(),
      };

      this._tasksFacade.addTask(newTask);

      this.closeDialog();
    }
  }

  closeDialog(): void {
    this.dialogClosed.emit();
  }
}
