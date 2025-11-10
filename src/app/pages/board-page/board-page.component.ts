import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  KanbanColumnComponent,
  TaskMoveEvent,
} from '../../components/kanban-column/kanban-column.component';
import { KanbanColumn } from '../../domain';
import { Status, Task } from '../../domain/task';
import { TasksFacade } from '../../services/facade/tasks-facade';

@Component({
  selector: 'app-board-page',
  imports: [CommonModule, KanbanColumnComponent],
  templateUrl: './board-page.component.html',
  styleUrl: './board-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent implements OnInit {
  readonly columns: KanbanColumn[] = [
    { status: 'todo', title: 'To Do' },
    { status: 'in-progress', title: 'In Progress' },
    { status: 'review', title: 'Review' },
    { status: 'done', title: 'Done' },
  ];

  private _tasksFacade: TasksFacade = inject(TasksFacade);

  public readonly categorizedTasks = this._tasksFacade.categorizedTasks;

  public ngOnInit(): void {
    this._tasksFacade.loadTasks();
  }

  public findTasksByStatus(status: Status): Task[] {
    return this.categorizedTasks()[status];
  }

  trackByStatus(_index: number, column: KanbanColumn): Status {
    return column.status;
  }

  private readonly connectedListIds: string[] = this.columns.map(
    (col) => `kanban-list-${col.status}`
  );

  // Get connected lists excluding the current one
  getConnectedLists(currentStatus: Status): string[] {
    return this.connectedListIds.filter((id) => id !== `kanban-list-${currentStatus}`);
  }

  // Handle task moved between columns
  onTaskMoved(event: TaskMoveEvent): void {
    if (event.previousStatus !== event.newStatus) {
      this._tasksFacade.updateTaskStatus(event.taskId, event.newStatus);
    }
  }
}
