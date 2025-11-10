import { createAction, props } from '@ngrx/store';
import { Task } from '../../domain';

export const loadTasksRequest = createAction('[Task] Load Tasks Request');

export const loadTasksSuccess = createAction('[Task] Load Tasks Success');

export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: string }>()
);

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());

export const removeTask = createAction('[Task] Remove Task', props<{ taskId: string }>());

export const updateTask = createAction(
  '[Task] Update Task',
  props<{ taskId: string; task: Task }>()
);

export const addManyTasks = createAction('[Task] Add many', props<{ tasks: Task[] }>());
