import { computed, inject, Injectable, Signal } from '@angular/core';
import { TaskStats } from '../../domain';
import { TasksFacade } from './tasks-facade';

@Injectable({
  providedIn: 'root',
})
export class TasksStatisticsFacade {
  private _tasksFacade: TasksFacade = inject(TasksFacade);

  public overdueTasks: Signal<number> = computed(() => {
    const today = new Date();
    return this._tasksFacade.allTasksSignal().filter((task) => {
      const dueDate = new Date(task.dueDate);
      return dueDate < today && task.status !== 'done';
    }).length;
  });

  public tasksStats: Signal<TaskStats> = computed(() => ({
    total: this._tasksFacade.allTasksSignal().length,
    inProgress: this._tasksFacade.categorizedTasks()['in-progress'].length,
    completed: this._tasksFacade.categorizedTasks()['done'].length,
    overdue: this.overdueTasks(),
  }));
}
