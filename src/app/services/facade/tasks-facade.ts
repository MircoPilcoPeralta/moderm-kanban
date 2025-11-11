import { computed, inject, Injectable, signal, Signal } from '@angular/core';
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

  public searchTerm = signal<string>('');

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

  public filteredTasks: Signal<Task[]> = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    if (!term) {
      return this.allTasksSignal();
    }

    return this.allTasksSignal().filter(
      (task) =>
        task.title.toLowerCase().includes(term) || task.description.toLowerCase().includes(term)
    );
  });

  public categorizedTasks: Signal<{
    todo: Task[];
    'in-progress': Task[];
    review: Task[];
    done: Task[];
  }> = computed(() => ({
    todo: this.filteredTasks()
      .filter((t) => t.status === 'todo')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
    'in-progress': this.filteredTasks()
      .filter((t) => t.status === 'in-progress')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
    review: this.filteredTasks()
      .filter((t) => t.status === 'review')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
    done: this.filteredTasks()
      .filter((t) => t.status === 'done')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
  }));

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

  public setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  public clearSearch(): void {
    this.searchTerm.set('');
  }
}
