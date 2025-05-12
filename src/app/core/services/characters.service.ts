import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable, BehaviorSubject, delay} from 'rxjs';
import {ApiResponse, Character, Filters} from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private _characterSelected = new BehaviorSubject<Character | null>(null);
  public characterSelected$: Observable<Character | null> = this._characterSelected.asObservable();

  private _charactersStatus = new BehaviorSubject<boolean>(false);
  public isLoadingCharacter$ = this._charactersStatus.asObservable();

  private _favoriteCharacters= new BehaviorSubject<Character[]>([]);
  public favoriteCharacters$ = this._favoriteCharacters.asObservable();

  updateCharacter(arg: Character) {
    this._characterSelected.next(arg);
    this._charactersStatus.next(false);
  }

  addFavoriteCharacter(arg: Character) {
    const favCharacters: Character[] = this._favoriteCharacters.getValue();
    this._favoriteCharacters.next([...favCharacters, arg]);
  }

  deleteFavoriteCharacter(arg: Character) {
    const favCharacters: Character[] = this._favoriteCharacters.getValue();
    const favCharactersUpdate = favCharacters.filter(favCharacter => { return favCharacter.id !== arg.id; });
    this._favoriteCharacters.next(favCharactersUpdate);
  }

  loadingNewCharacter() {
    this._charactersStatus.next(true);
  }

  constructor(private readonly _httpClient: HttpClient) { }

  getCharacters(page = 1, filters: Filters): Observable<ApiResponse> {
    let params = new HttpParams()
      .set('page', page)

      if (filters.gender?.length) params = params.set('gender', filters.gender)
      if (filters.species?.length) params = params.set('species', filters.species)
      if (filters.name?.length) params = params.set('name', filters.name)
      if (filters.status?.length) params = params.set('status', filters.status)

    return this._httpClient
      .get<ApiResponse>(`https://rickandmortyapi.com/api/character`, { params });
  }

  getCharacterById(id: number): Observable<Character> {
    return this._httpClient
      .get<Character>(`https://rickandmortyapi.com/api/character/${id}`)
      .pipe(
        delay(1000)
      )
  }

  getSelectedCharacter(id: number) {
    this.loadingNewCharacter()
    this.getCharacterById(id).subscribe(character => {
      this.updateCharacter(character);
    })
  }

}
