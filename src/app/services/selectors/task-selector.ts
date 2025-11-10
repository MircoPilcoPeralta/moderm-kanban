import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TASK_STATE_KEY } from '../../domain/constants/constants';
import { taskAdapter } from '../../state/adapters/task-adapter';
import { TaskEntityState } from '../../state/entities/task-entity';

export const selectTasksState = createFeatureSelector<TaskEntityState>(TASK_STATE_KEY);

export const { selectAll, selectIds, selectEntities, selectTotal } =
  taskAdapter.getSelectors(selectTasksState);

export const selectIsLoading = createSelector(
  selectTasksState,
  (state: TaskEntityState) => state.isLoading
);

export const selectError = createSelector(
  selectTasksState,
  (state: TaskEntityState) => state.error
);
