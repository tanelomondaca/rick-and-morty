import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, forkJoin, Observable, of, switchMap} from 'rxjs';
import {ApiResponse, Character, Episode, Filters, Location, OneCharacter} from '../interfaces/character.interface';
import {environments} from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private _characterSelected = new BehaviorSubject<OneCharacter | null>(null);
  public characterSelected$: Observable<OneCharacter | null> = this._characterSelected.asObservable();

  private _charactersStatus = new BehaviorSubject<boolean>(false);
  public isLoadingCharacter$ = this._charactersStatus.asObservable();

  private _favoriteCharacters= new BehaviorSubject<OneCharacter[]>([]);
  public favoriteCharacters$ = this._favoriteCharacters.asObservable();

  updateSelectedCharacter(arg: OneCharacter) {
    this._characterSelected.next(arg);
    this._charactersStatus.next(false);
  }

  addFavoriteCharacter(arg: OneCharacter) {
    const favCharacters: OneCharacter[] = this._favoriteCharacters.getValue();
    this._favoriteCharacters.next([...favCharacters, arg]);
  }

  deleteFavoriteCharacter(arg: OneCharacter) {
    const favCharacters: OneCharacter[] = this._favoriteCharacters.getValue();
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
      .get<ApiResponse>(`${environments.paths.base}${environments.paths.characters}`, { params });
  }

  getCharacterById(id: number): Observable<Character> {
    return this._httpClient
      .get<Character>(`${environments.paths.base}${environments.paths.characters}/${id}`)
  }

  getCharacterByUrl(url: string): Observable<Character> {
    return this._httpClient
      .get<Character>(url)
  }

  getSelectedCharacter(id: number) {
    this.loadingNewCharacter();

    this.getCharacterById(id).pipe(
      switchMap(character => {
        const originUrl = character.origin.url;
        const locationUrl = character.location.url;
        const episodeUrl = character.episode?.length ? character.episode[0] : null;

        const origin$ = originUrl ? this.getLocation(originUrl) : of(null);
        const location$ = locationUrl ? this.getLocation(locationUrl) : of(null);
        const episode$ = episodeUrl ? this.getEpisode(episodeUrl) : of(null);

        return forkJoin([of(character), origin$, location$, episode$]);
      }),
      switchMap(([character, origin, location, episode]) => {
        const originResidentUrl = origin?.residents?.[0];
        const locationResidentUrl = location?.residents?.[0];

        const originResident$ = originResidentUrl ? this.getCharacterByUrl(originResidentUrl) : of(null);
        const locationResident$ = locationResidentUrl ? this.getCharacterByUrl(locationResidentUrl) : of(null);

        return forkJoin([of(character), of(origin), of(location), originResident$, locationResident$, of(episode)]);
      })
    ).subscribe(([character, origin, location, originResident, locationResident, episode]) => {
      const selectedCharacter: OneCharacter = {
        image: character.image,
        name: character.name,
        locationName: location?.name ?? 'No hay información.',
        locationResident: locationResident?.name ?? 'No hay residentes en locacion.',
        originName: origin?.name ?? 'No hay información.',
        originResident: originResident?.name ?? 'No hay residentes en origen.',
        id: character.id,
        episodeName: `${episode?.episode} ${episode?.name}`,
      }
      this.updateSelectedCharacter(selectedCharacter);
    });
  }


  getLocation(originUrl: string): Observable<Location> {
    return this._httpClient.get<Location>(originUrl)
  }

  getEpisode(episodeUrl: string) {
    return this._httpClient.get<Episode>(episodeUrl);
  }

}
