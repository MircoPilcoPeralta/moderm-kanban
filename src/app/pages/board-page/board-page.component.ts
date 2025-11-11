import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { KanbanColumnComponent } from '../../components/kanban-column/kanban-column.component';
import { KanbanColumn, MoveEvent, Status, Task } from '../../domain';
import { TasksFacade } from '../../services/facade/tasks-facade';

@Component({
  selector: 'app-board-page',
  imports: [CommonModule, KanbanColumnComponent],
  templateUrl: './board-page.component.html',
  styleUrl: './board-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent implements OnInit {
  private _tasksFacade: TasksFacade = inject(TasksFacade);

  public readonly categorizedTasks = this._tasksFacade.categorizedTasks;

  public readonly allTasksStatuses = computed(() => Object.keys(this.categorizedTasks()));

  public readonly columns: Signal<KanbanColumn[]> = computed(() => [
    {
      status: 'todo',
      title: 'To Do',
      tasks: this.categorizedTasks()['todo'],
      count: this.categorizedTasks()['todo'].length,
      connectedLists: this.getConnectedLists('todo'),
    },
    {
      status: 'in-progress',
      title: 'In Progress',
      tasks: this.categorizedTasks()['in-progress'],
      count: this.categorizedTasks()['in-progress'].length,
      connectedLists: this.getConnectedLists('in-progress'),
    },
    {
      status: 'review',
      title: 'Review',
      tasks: this.categorizedTasks()['review'],
      count: this.categorizedTasks()['review'].length,
      connectedLists: this.getConnectedLists('review'),
    },
    {
      status: 'done',
      title: 'Done',
      tasks: this.categorizedTasks()['done'],
      count: this.categorizedTasks()['done'].length,
      connectedLists: this.getConnectedLists('done'),
    },
  ]);

  public ngOnInit(): void {
    this._tasksFacade.loadTasks();
  }

  onTaskMoved(event: MoveEvent): void {
    if (event.previousStatus !== event.newStatus) {
      this._tasksFacade.updateTaskStatus(event.taskId, event.newStatus);
    }
  }

  public findTasksByStatus(status: Status): Task[] {
    return this.categorizedTasks()[status];
  }

  trackByStatus(_index: number, column: KanbanColumn): Status {
    return column.status;
  }

  getConnectedLists(requestStatus: Status): string[] {
    return this.allTasksStatuses()
      .filter((status) => status !== requestStatus)
      .map((status) => `kanban-list-${status}`);
  }
}
