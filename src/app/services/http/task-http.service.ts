import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_TASKS } from '../../data/mock-tasks';
import { Task } from '../../domain';
import { LocalStorageTaskService } from './local-storage-task.service';

@Injectable({
  providedIn: 'root',
})
export class TaskHttpService {
  private _localStorageTaskService = inject(LocalStorageTaskService);

  constructor() {}

  fetchTasksMock(): Observable<Task[]> {
    return of(MOCK_TASKS);
  }

  fetchTasksFromLocalStorage(): Observable<Task[]> {
    const tasks = this._localStorageTaskService.loadTasks();
    return of(tasks);
  }
}
