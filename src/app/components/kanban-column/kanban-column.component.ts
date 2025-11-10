import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Status, Task } from '../../domain/task';
import { KanbanTaskCardComponent } from '../kanban-task-card/kanban-task-card.component';

export interface TaskMoveEvent {
  taskId: string;
  previousStatus: Status;
  newStatus: Status;
  previousIndex: number;
  currentIndex: number;
}

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [CommonModule, DragDropModule, KanbanTaskCardComponent],
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColumnComponent {
  @Input({ required: true }) status!: Status;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) tasks!: Task[];
  @Input({ required: true }) count!: number;
  @Input() connectedLists: string[] = [];

  @Output() taskMoved = new EventEmitter<TaskMoveEvent>();

  get listId(): string {
    return `kanban-list-${this.status}`;
  }

  trackByTaskId(_index: number, task: Task): string {
    return task.id;
  }

  onDrop(event: CdkDragDrop<Task[]>): void {
    const taskId = event.item.data?.id || event.container.data[event.currentIndex]?.id;

    if (!taskId) return;

    const previousStatus = this.extractStatusFromListId(event.previousContainer.id);
    const newStatus = this.extractStatusFromListId(event.container.id);

    this.taskMoved.emit({
      taskId,
      previousStatus,
      newStatus,
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex,
    });
  }

  private extractStatusFromListId(listId: string): Status {
    return listId.replace('kanban-list-', '') as Status;
  }
}
