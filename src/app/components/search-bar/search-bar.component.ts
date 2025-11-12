import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TasksFacade } from '../../services/facade/tasks-facade';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements OnDestroy {
  private _tasksFacade = inject(TasksFacade);

  private searchSubject$ = new Subject<string>();

  searchTerm = this._tasksFacade.searchTerm;

  constructor() {
    this.searchSubject$.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
      this._tasksFacade.setSearchTerm(term);
    });
  }

  public onSearchChange(value: string): void {
    this.searchSubject$.next(value);
  }

  public clearSearch(): void {
    this.searchSubject$.next('');
    this._tasksFacade.clearSearch();
  }

  public ngOnDestroy(): void {
    this.searchSubject$.complete();
  }
}
