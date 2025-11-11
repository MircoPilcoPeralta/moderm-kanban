import { Injectable } from '@angular/core';
import { MOCK_TASKS } from '../../data/mock-tasks';
import { Task } from '../../domain';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageTaskService {
  private readonly STORAGE_KEY = 'kanban-tasks';

  constructor() {}

  loadTasks(): Task[] {
    try {
      const tasksJson = localStorage.getItem(this.STORAGE_KEY);

      if (tasksJson) {
        const tasks = JSON.parse(tasksJson);
        return tasks.map((task: any) => ({
          ...task,
          dueDate: new Date(task.dueDate),
          createdAt: new Date(task.createdAt),
        }));
      }

      this.saveTasks(MOCK_TASKS);
      return MOCK_TASKS;
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return MOCK_TASKS;
    }
  }

  saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }

  clearTasks(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing tasks from localStorage:', error);
    }
  }
}
