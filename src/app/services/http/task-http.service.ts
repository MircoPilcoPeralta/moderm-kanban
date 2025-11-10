import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../domain';
import { MOCK_TASKS } from '../../data/mock-tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskHttpService {

  constructor() { }

  fetchTasksMock(): Observable<Task[]> {
    return of(MOCK_TASKS)
  }

}
