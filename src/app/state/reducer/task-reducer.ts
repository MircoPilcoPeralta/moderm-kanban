import { createReducer, on } from '@ngrx/store';
import {
  loadTasksRequest,
  loadTasksSuccess,
  loadTasksFailure,
  addTask,
  removeTask,
  updateTask,
  addManyTasks,
} from '../actions/task-actions';
import { taskAdapter, initialState } from '../adapters/task-adapter';

export const taskReducer = createReducer(
  initialState,

  on(loadTasksRequest, (state) => ({ ...state, isLoading: true, error: null })),

  on(loadTasksSuccess, (state) => ({ ...state, isLoading: false, error: null })),

  on(loadTasksFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  on(addTask, (state, { task }) => taskAdapter.addOne(task, state)),

  on(removeTask, (state, { taskId }) => taskAdapter.removeOne(taskId, state)),

  on(updateTask, (state, { taskId, task }) =>
    taskAdapter.updateOne({ id: taskId, changes: task }, state)
  ),

  on(addManyTasks, (state, { tasks }) => taskAdapter.addMany(tasks, state))
);
