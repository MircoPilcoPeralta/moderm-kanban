import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Task } from '../../domain/task';
import { addTask } from '../../state/actions/task.actions';
import { selectAll } from '../selectors/task-selector';

@Injectable({
  providedIn: 'root',
})
export class TasksFacade {
  private _store: Store = inject(Store);

  private allTasksSignal = toSignal(this._store.select(selectAll));

  get allTasks(): Task[] {
    return this.allTasksSignal() ?? [];
  }

  public addTask(task: Task) {
    this._store.dispatch(addTask({ task }));
  }
}
