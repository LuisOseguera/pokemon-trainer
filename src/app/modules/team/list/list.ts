import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pokemon } from '../../../core/services/pokemon';
import { AppState } from '../../../core/services/app-state';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

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

  constructor(
    private pokemonService: Pokemon,
    private appState: AppState,
    private router: Router
  ) {}

  ngOnInit() {
    this.pokemonService.getFirstGeneration().subscribe((data) => { // Get all Pokémon to list.
      this.allPokemon = data;
      this.filteredPokemon = data;
    });
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

  goBack() {
    this.router.navigate(['/summary']);
  }

  // Returns to profile view:
  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
}
