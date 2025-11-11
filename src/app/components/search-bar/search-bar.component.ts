import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksFacade } from '../../services/facade/tasks-facade';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  private _tasksFacade = inject(TasksFacade);

  searchTerm = this._tasksFacade.searchTerm;

  onSearchChange(value: string): void {
    this._tasksFacade.setSearchTerm(value);
  }

  clearSearch(): void {
    this._tasksFacade.clearSearch();
  }
}
