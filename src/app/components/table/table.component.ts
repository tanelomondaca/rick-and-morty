import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {CharactersService} from '../../core/services/characters.service';
import {Character} from '../../core/interfaces/character.interface';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-table',
  imports: [MatTableModule],
  providers: [CharactersService, HttpClient],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'status', 'species', 'type', 'gender', 'created'];
  dataSource: Character[] = [];
  subs = new Subscription();

  constructor(private readonly charactersService: CharactersService) {}

  ngOnInit() {
    const subscription = this.charactersService.getCharacters().subscribe( characters => this.dataSource = characters );
    this.subs.add(subscription);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
