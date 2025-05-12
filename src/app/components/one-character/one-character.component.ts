import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {OneCharacter} from '../../core/interfaces/character.interface';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {CharactersService} from '../../core/services/characters.service';
import {Subscription} from 'rxjs';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-one-character',
  imports: [
    NgOptimizedImage,
    MatChipsModule,
    MatIconModule,
    CommonModule,
    MatProgressSpinner,
  ],
  templateUrl: './one-character.component.html',
  styleUrl: './one-character.component.css'
})
export class OneCharacterComponent implements OnInit, OnDestroy {
  charactersService = inject(CharactersService);
  character: OneCharacter | null = null;
  isLoadingCharacter = false;
  favoriteCharacters: OneCharacter[] = [];
  isMarkedAsFavorite = false;

  subs = new Subscription()

  constructor() {}

  ngOnInit() {
    const subCharacter = this.charactersService
      .characterSelected$
      .subscribe(character => {
      this.character = character;
      if (character) {
        this.isMarkedAsFavorite = this.favoriteCharacters.some(favChar => favChar.id === character.id);
      } else {
        this.isMarkedAsFavorite = false;
      }
    });
    this.subs.add(subCharacter);

    const subStatus = this.charactersService
      .isLoadingCharacter$
      .subscribe(isLoadingCharacter => this.isLoadingCharacter = isLoadingCharacter);
    this.subs.add(subStatus);

    const subFavCharacter = this.charactersService
      .favoriteCharacters$
      .subscribe(favCharacters => {
        this.favoriteCharacters = favCharacters;
      })
    this.subs.add(subFavCharacter);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  changeFavorite(character: OneCharacter) {
    if (this.isMarkedAsFavorite) {
      this.charactersService.deleteFavoriteCharacter(character)
      this.isMarkedAsFavorite = false;
    } else {
      this.isMarkedAsFavorite = true;
      this.charactersService.addFavoriteCharacter(character);
    }
  }
}
