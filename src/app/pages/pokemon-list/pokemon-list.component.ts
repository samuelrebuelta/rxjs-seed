import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { filter, forkJoin, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { RequestService } from 'src/app/core/services/request.service';
import { Pokemon, PokemonListApi } from './pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  @ViewChild('button') button?: ElementRef<HTMLButtonElement>;

  public pokemonList$?: Observable<Pokemon[]>;
  public totalPokemons?: number;

  public clickCounter: number = 0;

  private readonly unsubscribe$ = new Subject<void>();


  constructor(
    private requestService: RequestService,
  ) { }

  ngOnInit(): void {
    // this.pokemonList$ = this.setPokemonListSubscription();
    
    this.fetchPokemonListWithDetail();

    this.fetchPokemonListWithDetailWithoutOperators();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // EX. SET POKEMON LIST SUBSCRIPTION
  private setPokemonListSubscription(): Observable<Pokemon[]> {
    return this.fetchPokemonList().pipe(
      // Filtramos que la respuesta tenga valor
      filter(pokemonListRes => !!pokemonListRes),
      // Mapeamos los resultados devolviendo solo los datos que necesitamos
      map(pokemonListRes => pokemonListRes.results),
      // Guardamos el total de pokemons en una variable
      tap(pokemonList => this.totalPokemons = pokemonList.length),
      // Mantenemos la suscripción hasta que el subject unsubscribe$ la cancele
      takeUntil(this.unsubscribe$)
    );
  }

  

  // EX. POKEMON LIST
  private fetchPokemonList(): Observable<PokemonListApi> {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9';
    return this.requestService.get(url);
  }

  // EX. POKEMON WITH DETAIL
  private fetchPokemonListWithDetail() {
    this.fetchPokemonList()
      .pipe(
        map(pokemonListRes => pokemonListRes.results),
        switchMap(pokemonList => {
          const detailRequests = pokemonList.map(pokemon => this.fetchPokemonDetail(pokemon.name));
          return forkJoin(detailRequests)
        })
      )
      .subscribe(pokemonListWithDetail => {
        console.log(pokemonListWithDetail);
      });
  }

  // EX. POKEMON WITH DETAIL BAD
  private fetchPokemonListWithDetailWithoutOperators() {
    this.fetchPokemonList().subscribe(pokemonList => {
      const { results } = pokemonList;
      const pokemonListWithDetail: Pokemon[] = [];

      results.forEach((p, i) => {
        this.fetchPokemonDetail(p.name).subscribe(detail => {
          pokemonListWithDetail[i] = detail;
          if (i === results.length - 1) { console.log(pokemonListWithDetail); }
        })
      })
    });
  }

  private fetchPokemonDetail(name: string): Observable<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return this.requestService.get(url);
  }
}
