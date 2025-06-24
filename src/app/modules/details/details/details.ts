import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppState } from '../../../core/services/app-state';
import { PokemonDetails, PokemonStat } from '../../../core/models/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
  standalone: true,
})
export class Details implements OnInit {
  profile: any;
  team: PokemonDetails[] = [];

  constructor(private appState: AppState, private router: Router) {}

  ngOnInit(): void {
    this.profile = this.appState.getProfileData();
    this.team = this.appState.getSelectedPokemon();
  }

  // Get percent of total stat width:
  getStatWidth(stat: PokemonStat): number {
    const maxValues: Record<string, number> = {
      hp: 255,
      attack: 190,
      defense: 230,
      'special-attack': 194,
      'special-defense': 230,
      speed: 180,
    };
    const max = maxValues[stat.stat.name] || 100;
    return Math.min((stat.base_stat / max) * 100, 100);
  }

  // Returns to team selection view:
  navigateToTeam() {
    this.router.navigate(['/pokemon-team']);
  }

  // Returns to profile view:
  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  // Returns to profile view and reset the information:
  resetApp() {
    this.appState.clearState();
    this.router.navigate(['/profile']);
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

  // Stats translations to Spanish:
  translateStat(statName: string): string {
    const translations: { [key: string]: string } = {
      hp: 'Salud',
      attack: 'Ataque',
      defense: 'Defensa',
      'special-attack': 'Ataque Especial',
      'special-defense': 'Defensa Especial',
      speed: 'Velocidad',
    };

    return translations[statName] || statName;
  }
}
