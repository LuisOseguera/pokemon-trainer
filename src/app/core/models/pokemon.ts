// Interface attribute for stats:
export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

// Interface attributes for Pokémon details:
export interface PokemonDetails {
  id: number;
  name: string;
  stats: PokemonStat[];
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
}
