import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {TableComponent} from './components/table/table.component';

@Component({
  selector: 'app-root',
  imports: [
    MatSidenavContainer,
    MatToolbar,
    MatButton,
    MatSidenav,
    MatSidenavContent,
    TableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rick-and-morty';
}
