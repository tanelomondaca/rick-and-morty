import { Component } from '@angular/core';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-favorite-characters',
  imports: [
    MatChip,
    MatChipSet,
    MatIconModule,
  ],
  templateUrl: './favorite-characters.component.html',
  styleUrl: './favorite-characters.component.css'
})
export class FavoriteCharactersComponent {

}
