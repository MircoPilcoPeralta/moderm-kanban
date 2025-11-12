import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs';
import { LocalStorageTaskService } from '../../services/http/local-storage-task.service';
import { addManyTasks, addTask, removeTask, updateTask } from '../actions/task-actions';
import { selectAllTasks } from '../selectors/task-selector';

@Injectable({
  providedIn: 'root',
})
export class SaveTasksEffect {
  private actions$ = inject(Actions);

  private _store = inject(Store);

  private _localStorageTaskService = inject(LocalStorageTaskService);

  saveTasksEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addTask, updateTask, removeTask, addManyTasks),
        withLatestFrom(this._store.select(selectAllTasks)),
        tap(([action, tasks]) => {
          this._localStorageTaskService.saveTasks(tasks);
        })
      ),
    { dispatch: false }
  );
}
