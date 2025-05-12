import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Character} from '../../core/interfaces/character.interface';
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
  character: Character | null = null;
  isLoadingCharacter = false;

  subs = new Subscription()

  constructor() {}

  ngOnInit() {
    const subCharacter = this.charactersService.characterSelected$.subscribe(character => {
      this.character = character;
    });

    const subStatus = this.charactersService.isLoadingCharacter$.subscribe(isLoadingCharacter => this.isLoadingCharacter = isLoadingCharacter);

    this.subs.add(subCharacter);
    this.subs.add(subStatus);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
