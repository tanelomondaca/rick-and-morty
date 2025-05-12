import {FormControl} from '@angular/forms';

export interface ApiResponse {
  info:    Info;
  results: Character[];
}

export interface Info {
  count: number;
  pages: number;
  next:  string;
  prev:  null;
}

export interface Character {
  id:       number;
  name:     string;
  status:   Status;
  species:  Species;
  type:     string;
  gender:   Gender;
  origin:   Location;
  location: Location;
  image:    string;
  episode:  string[];
  url:      string;
  created:  Date;
}

export type Gender = "Male" | "Female" | "unknown";

export interface Location {
  id:        number;
  name:      string;
  type:      string;
  dimension: string;
  residents: string[];
  url:       string;
  created:   Date;
}


export type Species = "Human" | "Alien";

export type Status = "Alive" | "unknown" | "Dead";

export interface Filters {
  name: string;
  species: string;
  status: string;
  gender: string;
}

export interface FilterForm {
  name: FormControl<string | null>;
  species: FormControl<string | null>;
  status: FormControl<string | null>;
  gender: FormControl<string | null>;
}

export interface OneCharacter {
  id: number;
  image: string;
  originName: string;
  originResident?: string;
  locationName: string;
  locationResident?: string;
  episodeName?: string;
  name: string;
}

export interface Episode {
  id: 	number;
  name: 	string;
  air_date: 	string;
  episode: 	string;
  characters: 	string[];
  url: 	string;
  created: 	string;
}
