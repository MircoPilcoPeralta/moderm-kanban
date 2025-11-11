import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, of, switchMap, tap } from 'rxjs';
import { TaskHttpService } from '../../services/http/task-http.service';
import { ToastService } from '../../services/toast.service';
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
  private _toastService = inject(ToastService);

  loadTasksEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasksRequest),
      tap(() => {
        console.log('Loading tasks...');
        this._toastService.showLoading('Loading tasks...');
      }),
      switchMap(() =>
        this._taskHttpService.fetchTasksFromLocalStorage().pipe(
          delay(2000),
          tap((tasks) => {
            console.log('Tasks loaded:', tasks);
            this._toastService.showSuccess('Tasks loaded successfully!');
          }),
          switchMap((tasks) => [addManyTasks({ tasks }), loadTasksSuccess()]),
          catchError((error) => {
            this._toastService.showError('Failed to load tasks');
            return of(loadTasksFailure({ error }));
          })
        )
      )
    )
  );
}
