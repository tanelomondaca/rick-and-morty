import {Component, inject, OnInit} from '@angular/core';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {CharactersService} from '../../core/services/characters.service';
import {Subscription} from 'rxjs';
import {Character} from '../../core/interfaces/character.interface';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-favorite-characters',
  imports: [
    MatChip,
    MatChipSet,
    MatIconModule,
    NgForOf,
  ],
  templateUrl: './favorite-characters.component.html',
  styleUrl: './favorite-characters.component.css'
})
export class FavoriteCharactersComponent implements OnInit {

  private charactersService = inject(CharactersService);
  private subs = new Subscription();
  protected favCharacters: Character[] = [];

  constructor() {}

  ngOnInit() {
    const subFavChar = this.charactersService.favoriteCharacters$.subscribe(resp => this.favCharacters = resp)
    this.subs.add(subFavChar);
  }

  loadCharacter(characterId: number) {
    this.charactersService.getSelectedCharacter(characterId)
  }
}
