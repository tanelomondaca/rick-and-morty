import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {TableComponent} from './components/table/table.component';
import {MatCard} from '@angular/material/card';
import {OneCharacterComponent} from './components/one-character/one-character.component';
import {FavoriteCharactersComponent} from './components/favorite-characters/favorite-characters.component';
import {SummaryTotalsComponent} from './components/summary-totals/summary-totals.component';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbar,
    TableComponent,
    MatCard,
    OneCharacterComponent,
    FavoriteCharactersComponent,
    SummaryTotalsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rick-and-morty';
}
