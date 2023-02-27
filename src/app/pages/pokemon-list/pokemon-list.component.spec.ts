import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { PokemonListComponent } from './pokemon-list.component';

describe('PokemonListComponent', () => {
  let spectator: Spectator<PokemonListComponent>;
  const createComponent = createComponentFactory(PokemonListComponent);
});