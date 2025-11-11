import { Status } from '.';

export interface MoveEvent {
  taskId: string;
  previousStatus: Status;
  newStatus: Status;
}
