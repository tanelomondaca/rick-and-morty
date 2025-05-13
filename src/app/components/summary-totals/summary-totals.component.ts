import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { NgForOf } from '@angular/common';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Species, ApiResponse } from '../../core/interfaces/character.interface';
import { CharactersService } from '../../core/services/characters.service';

@Component({
  selector: 'app-summary-totals',
  standalone: true,
  imports: [MatListModule, NgForOf],
  templateUrl: './summary-totals.component.html',
  styleUrls: ['./summary-totals.component.css']
})
export class SummaryTotalsComponent implements OnInit {
  protected readonly Species = Species;
  protected readonly Object = Object;

  totalBySpecies: Map<Species, number> = new Map(
    Object.values(Species).map(species => [species, 0 as number])
  );

  isLoading = false;

  constructor(private readonly charactersService: CharactersService) {}

  ngOnInit(): void {
    this.loadTotalsBySpecies();
  }

  private loadTotalsBySpecies(): void {
    this.isLoading = true;

    const speciesArray = Object.values(Species);
    const requests = speciesArray.map(species =>
      this.charactersService.getCharacters(1, { species })
    );

    forkJoin(requests)
      .pipe(
        finalize(() => (this.isLoading = false))
      )
      .subscribe((responses: ApiResponse[]) => {
        responses.forEach((resp, index) => {
          const species = speciesArray[index];
          this.totalBySpecies.set(species, resp.info.count);
        });
      });
  }

}

