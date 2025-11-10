import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Task } from '../../domain/task';
import { TasksFacade } from '../../services/facade/get-all-tasks-facade';

@Component({
  selector: 'app-board-page',
  imports: [CommonModule],
  templateUrl: './board-page.component.html',
  styleUrl: './board-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent {
  private _getAllTasks: TasksFacade = inject(TasksFacade);

  get allTasks(): Task[] {
    return this._getAllTasks.allTasks;
  }
}
