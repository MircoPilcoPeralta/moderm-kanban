import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Status, Task } from '../../domain/task';
import { KanbanTaskCardComponent } from '../kanban-task-card/kanban-task-card.component';
import { MoveEvent, KanbanColumn } from '../../domain';

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [CommonModule, DragDropModule, KanbanTaskCardComponent],
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColumnComponent {
  public column = input.required<KanbanColumn>();

  public taskMoved = output<MoveEvent>();

  public listId = computed(() => `kanban-list-${this.column().status}`);

  public trackByTaskId(_index: number, task: Task): string {
    return task.id;
  }

  public onDrop(event: CdkDragDrop<Task[]>): void {
    const task: Task | undefined =
      event.item.data || event.previousContainer.data[event.previousIndex];

    if (!task) {
      console.error('Could not extract task from drop event');
      return;
    }

    const previousStatus = this.extractStatusFromListId(event.previousContainer.id);

    const newStatus = this.extractStatusFromListId(event.container.id);

    if (previousStatus !== newStatus) {
      this.taskMoved.emit({
        taskId: task.id,
        previousStatus,
        newStatus,
      });
    }
  }

  private extractStatusFromListId(listId: string): Status {
    return listId.replace('kanban-list-', '') as Status;
  }
}
