import { computed, inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Status, Task } from '../../domain/task';
import { addTask, loadTasksRequest, updateTask } from '../../state/actions/task-actions';
import { selectAllTasks, selectError, selectIsLoading } from '../../state/selectors/task-selector';

@Injectable({
  providedIn: 'root',
})
export class TasksFacade {
  private _store: Store = inject(Store);

  // todo: llevar a método
  public allTasksSignal: Signal<Task[]> = toSignal(this._store.select(selectAllTasks), {
    initialValue: [],
  });

  public loadingTasks: Signal<boolean> = toSignal(this._store.select(selectIsLoading), {
    initialValue: false,
  });

  public errorTasks: Signal<string | null> = toSignal(this._store.select(selectError), {
    initialValue: null,
  });

  public categorizedTasks: Signal<{
    todo: Task[];
    'in-progress': Task[];
    review: Task[];
    done: Task[];
  }> = computed(() => ({
    todo: this.allTasksSignal()
      .filter((t) => t.status === 'todo')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
    'in-progress': this.allTasksSignal()
      .filter((t) => t.status === 'in-progress')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
    review: this.allTasksSignal()
      .filter((t) => t.status === 'review')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
    done: this.allTasksSignal()
      .filter((t) => t.status === 'done')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
  }));

  // todo para filtros crear un objeto de filtro y un computed signal

  public loadTasks() {
    this._store.dispatch(loadTasksRequest());
  }

  public addTask(task: Task) {
    this._store.dispatch(addTask({ task }));
  }

  public updateTaskStatus(taskId: string, newStatus: Status) {
    const allTasks: Task[] = this.allTasksSignal();

    const task = allTasks.find((t) => t.id === taskId);

    if (task && task.status !== newStatus) {
      const updatedTask: Task = { ...task, status: newStatus };
      this._store.dispatch(updateTask({ taskId, task: updatedTask }));
    }
  }
}
