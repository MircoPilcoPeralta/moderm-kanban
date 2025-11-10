import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Task } from '../../domain';
import { TaskEntityState } from '../entities/task-entity';

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: TaskEntityState = taskAdapter.getInitialState({
  isLoading: false,
  error: null,
});
