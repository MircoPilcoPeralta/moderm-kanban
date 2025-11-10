import { EntityState } from '@ngrx/entity';
import { Task } from '../../domain';

interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface TaskEntityState extends EntityState<Task>, LoadingState {}
