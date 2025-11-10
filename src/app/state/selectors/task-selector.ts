import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TASK_STATE_KEY } from '../../domain/constants/constants';
import { taskAdapter } from '../adapters/task-adapter';
import { TaskEntityState } from '../entities/task-entity';

export const selectTasksState = createFeatureSelector<TaskEntityState>(TASK_STATE_KEY);

export const { selectAll, selectIds, selectEntities, selectTotal } = taskAdapter.getSelectors();

export const selectAllTasks = createSelector(selectTasksState, selectAll);

export const selectIsLoading = createSelector(selectTasksState, (state) => state.isLoading);

export const selectError = createSelector(selectTasksState, (state) => state.error);
