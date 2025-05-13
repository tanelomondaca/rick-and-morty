import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {CharactersService} from '../../core/services/characters.service';
import {Character, FilterForm, Filters} from '../../core/interfaces/character.interface';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {StatusColorDirective} from '../../core/directives/status-color.directive';

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatButton,
    MatInput,
    MatFormField,
    MatLabel,
    MatButtonToggleGroup,
    MatButtonToggleGroup,
    MatButtonToggle,
    StatusColorDirective
  ],
  providers: [HttpClient],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'status', 'species', 'type', 'gender', 'created'];
  dataSource: Character[] = [];
  subs = new Subscription();
  filterForm: FormGroup<FilterForm>;
  appliedFilters: Filters = {
    name: '',
    species: '',
    status: '',
    gender: ''
  };
  totalItems = 0

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly charactersService: CharactersService,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      name: [''],
      species: [''],
      status: [''],
      gender: [''],
    })
  }


  ngOnInit() {
    this.loadCharacters()
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  loadCharacters(page = 1) {
    const subscription = this.charactersService
      .getCharacters(page, this.appliedFilters)
      .subscribe( apiResponse => {
        this.dataSource = apiResponse.results
        this.totalItems = apiResponse.info.count
      });
    this.subs.add(subscription);
  }

  selectCharacter(id: number) {
    this.charactersService.getSelectedCharacter(id)
  }

  pageChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    this.loadCharacters(pageIndex);
  }

  filterCharacters() {
    this.appliedFilters = this.filterForm.value as Filters;
    this.loadCharacters();
  }

  cleanFilters() {
    this.filterForm.reset()
    this.appliedFilters = this.filterForm.value as Filters;
    this.loadCharacters();
  }
}
