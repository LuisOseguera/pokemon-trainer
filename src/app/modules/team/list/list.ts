import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pokemon } from '../../../core/services/pokemon';
import { AppState } from '../../../core/services/app-state';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PokemonDetails, PokemonStat } from '../../../core/models/pokemon';

@Component({
  selector: 'app-list',
  imports: [CommonModule, FormsModule, ScrollingModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  standalone: true,
})
export class List implements OnInit {
  // Set all empty variables on initialize for clean:
  allPokemon: any[] = [];
  filteredPokemon: any[] = [];
  selected: any[] = [];
  search = '';

  // Variables to get profile info:
  profile: any;
  team: PokemonDetails[] = [];

  constructor(
    private pokemonService: Pokemon,
    private appState: AppState,
    private router: Router
  ) {}

  ngOnInit() {
    this.pokemonService.getFirstGeneration().subscribe((data) => {
      // Get all Pokémon to list.
      this.allPokemon = data;
      this.filteredPokemon = data;
    });
    this.profile = this.appState.getProfileData();
    this.team = this.appState.getSelectedPokemon();
  }

  // Search settings by ID or name:
  onSearch() {
    const value = this.search.toLowerCase();
    this.filteredPokemon = this.allPokemon.filter(
      (p) => p.name.includes(value) || p.id.toString() === value // Set ID from Pokémon API for better search.
    );
  }

  // Function that manage select mechanic for only 3 Pokémon at time:
  toggleSelect(pokemon: any) {
    const index = this.selected.findIndex((p) => p.id === pokemon.id);
    if (index > -1) {
      this.selected.splice(index, 1);
    } else if (this.selected.length < 3) {
      this.selected.push(pokemon);
    }
  }

  // Function that validate if a Pokémon is already selected:
  isSelected(pokemon: any): boolean {
    return this.selected.some((p) => p.id === pokemon.id);
  }

  // Save selected items:
  saveAndContinue() {
    if (this.selected.length === 3) {
      this.appState.setSelectedPokemon(this.selected);
      this.router.navigate(['/summary']);
    }
  }

  // Returns age in years according birthdate:
  getAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }
}
