import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ApiResponse, Character} from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private readonly _httpClient: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    return this._httpClient
      .get<ApiResponse>('https://rickandmortyapi.com/api/character')
      .pipe(
        map((response) => response.results)
      );
  }

}
