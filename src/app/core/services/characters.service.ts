import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, BehaviorSubject, delay} from 'rxjs';
import {ApiResponse, Character} from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private _characterSelected = new BehaviorSubject<Character | null>(null);
  public characterSelected$: Observable<Character | null> = this._characterSelected.asObservable();

  private _charactersStatus = new BehaviorSubject<boolean>(false);
  public isLoadingCharacter$ = this._charactersStatus.asObservable();

  updateCharacter(arg: Character) {
    this._characterSelected.next(arg);
    this._charactersStatus.next(false);
  }

  loadingNewCharacter() {
    this._charactersStatus.next(true);
  }

  constructor(private readonly _httpClient: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    return this._httpClient
      .get<ApiResponse>('https://rickandmortyapi.com/api/character')
      .pipe(
        map((response) => response.results)
      );
  }

  getCharacterById(id: string): Observable<Character> {
    return this._httpClient
      .get<Character>(`https://rickandmortyapi.com/api/character/${id}`)
      .pipe(
        delay(1000)
      )
  }

}
