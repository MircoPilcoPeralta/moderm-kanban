import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap, tap } from 'rxjs';
import { TaskHttpService } from '../../services/http/task-http.service';
import {
  addManyTasks,
  loadTasksFailure,
  loadTasksRequest,
  loadTasksSuccess,
} from '../actions/task-actions';

@Injectable({
  providedIn: 'root',
})
export class LoadTasksEffect {
  private actions$ = inject(Actions);

  private _taskHttpService = inject(TaskHttpService);

  loadTasksEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasksRequest),
      tap(() => console.log('Loading tasks...')),
      switchMap(() =>
        this._taskHttpService.fetchTasksMock().pipe(
          tap((tasks) => console.log('Tasks loaded:', tasks)),
          switchMap((tasks) => [addManyTasks({ tasks }), loadTasksSuccess()]),
          catchError((error) => of(loadTasksFailure({ error })))
        )
      )
    )
  );
}
