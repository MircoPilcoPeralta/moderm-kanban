import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
  public task = input.required<Task>();
}
