import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface Character {
  name: string;
  status: number;
  species: number;
  type: string;
  gender: string;
  created: string;
}

const CHARACTER_DATA: Character[] = [
  {
    status: 1,
    name: 'Hydrogen',
    species: 1.0079,
    type: 'H',
    gender: 'GENDER',
    created: 'CREATED'
  },
  {
    status: 2,
    name: 'Helium',
    species: 4.0026,
    type: 'He',
    gender: 'GENDER',
    created: 'CREATED'
  },
  {
    status: 3,
    name: 'Lithium',
    species: 6.941,
    type: 'Li',
    gender: 'GENDER',
    created: 'CREATED'
  },
];

@Component({
  selector: 'app-table',
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  displayedColumns: string[] = ['status', 'name', 'species', 'type', 'gender', 'created'];
  dataSource = CHARACTER_DATA;

}
