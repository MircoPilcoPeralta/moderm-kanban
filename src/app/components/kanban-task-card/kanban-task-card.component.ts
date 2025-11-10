import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Task } from '../../domain/task';

@Component({
  selector: 'app-kanban-task-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './kanban-task-card.component.html',
  styleUrl: './kanban-task-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanTaskCardComponent {
  @Input({ required: true }) task!: Task;
}
