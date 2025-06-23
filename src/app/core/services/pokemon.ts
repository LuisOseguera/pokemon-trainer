import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Pokemon {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getFirstGeneration(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/pokemon?limit=151`).pipe(
      switchMap((res) => {
        const pokemonDetails = res.results.map((pokemon: any) =>
          this.http.get(pokemon.url)
        );
        return forkJoin(pokemonDetails);
      }),
      map((results) => results as any[])
    );
  }
}
