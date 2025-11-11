import { Status, Task } from '.';

export interface KanbanColumn {
  status: Status;
  title: string;
  tasks: Task[];
  count: number;
  connectedLists?: string[];
}
