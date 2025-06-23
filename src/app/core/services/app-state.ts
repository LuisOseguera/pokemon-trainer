import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppState {
  private profileKey = 'pokemon_profile';
  private teamKey = 'pokemon_team';

  // Save profile information data temporarily:
  setProfileData(data: any) {
    localStorage.setItem(this.profileKey, JSON.stringify(data));
  }

  // Get profile information data saved temporarily:
  getProfileData() {
    const raw = localStorage.getItem(this.profileKey);
    return raw ? JSON.parse(raw) : null;
  }

  // Save selected Pokémon information data temporarily:
  setSelectedPokemon(pokemon: any[]) {
    localStorage.setItem(this.teamKey, JSON.stringify(pokemon));
  }

  // Get selected Pokémon information data saved temporarily:
  getSelectedPokemon() {
    const raw = localStorage.getItem(this.teamKey);
    return raw ? JSON.parse(raw) : [];
  }

  // Clear data:
  clearState() {
    localStorage.removeItem(this.profileKey);
    localStorage.removeItem(this.teamKey);
  }
}
