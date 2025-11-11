import { Component, input } from '@angular/core';
import { TaskStats } from '../../domain';

@Component({
  selector: 'app-stats-panel',
  imports: [],
  templateUrl: './stats-panel.html',
  styleUrl: './stats-panel.css',
})
export class StatsPanel {
  public stats = input.required<TaskStats>();
}
