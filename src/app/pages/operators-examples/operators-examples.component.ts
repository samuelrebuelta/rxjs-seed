import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { distinctUntilChanged, distinctUntilKeyChanged, filter, from, interval, of, throttleTime, timer } from 'rxjs';
import { debounceTime, fromEvent, map, startWith, Subject, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-operators-examples',
  templateUrl: './operators-examples.component.html',
  styleUrls: ['./operators-examples.component.css']
})
export class OperatorsExamplesComponent implements AfterViewInit, OnDestroy {

  @ViewChild('button') button?: ElementRef<HTMLButtonElement>;
  
  public clickCounter: number = 0;

  private readonly unsubscribe$ = new Subject<void>();

  ngAfterViewInit(): void {
    // this.filterOperator();
    // this.mapOperator();
    // this.takeOperator();
    // this.takeUntilOperator();
    // this.distinctUntilChangedOperator();
    // this.distinctUntilKeyChangedOperator();
    // this.throttleTimeOperator();
    // this.debounceTime();
    // this.startWithOperator();

    // this.setClickSubscription();
  }

  private filterOperator() {
    //emit (1,2,3,4,5)
    const source = from([1, 2, 3, 4, 5]);
    //filter out non-even numbers
    const example = source.pipe(filter(num => num % 2 === 0));
    //output: "Even number: 2", "Even number: 4"
    const subscribe = example.subscribe(val => console.log(`Even number: ${val}`));
  }

  private mapOperator() {
    //emit (1,2,3,4,5)
    const source = from([1, 2, 3, 4, 5]);
    //add 10 to each value
    const example = source.pipe(map(val => val + 10));
    //output: 11,12,13,14,15
    const subscribe = example.subscribe(val => console.log(val));
  }

  private takeOperator() {
    //emit value every 1s
    const interval$ = interval(1000);
    //take the first 5 emitted values
    const example = interval$.pipe(take(5));
    //output: 0,1,2,3,4
    const subscribe = example.subscribe(val => console.log(val));
  }

  private takeUntilOperator() {
    //emit value every 1s
    const source = interval(1000);
    //after 5 seconds, emit value
    const timer$ = timer(5000);
    //when timer emits after 5s, complete source
    const example = source.pipe(takeUntil(timer$));
    //output: 0,1,2,3
    const subscribe = example.subscribe(val => console.log(val));
  }

  private distinctUntilChangedOperator() {
    // only output distinct values, based on the last emitted value
    const source$ = from([
      { name: 'Brian' },
      { name: 'Joe' },
      { name: 'Joe' },
      { name: 'Sue' }
    ]);

    source$
      // custom compare for name
      .pipe(distinctUntilChanged((prev, curr) => prev.name === curr.name))
      // output: { name: 'Brian }, { name: 'Joe' }, { name: 'Sue' }
      .subscribe(console.log);
  }

  private distinctUntilKeyChangedOperator() {
    // only output distinct values, based on the last emitted value
    const source$ = from([
      { name: 'Brian' },
      { name: 'Joe' },
      { name: 'Joe' },
      { name: 'Sue' }
    ]);

    source$
      // custom compare based on name property
      .pipe(distinctUntilKeyChanged('name'))
      // output: { name: 'Brian }, { name: 'Joe' }, { name: 'Sue' }
      .subscribe(console.log);
  }

  private throttleTimeOperator() {
    // emit value every 1 second
    const source = interval(1000);
    /*
      emit the first value, then ignore for 5 seconds. repeat...
    */
    const example = source.pipe(throttleTime(5000));
    // output: 0...6...12
    const subscribe = example.subscribe(val => console.log(val));
  }

  private debounceTime() {
    // elem ref
    const searchBox = document.getElementById('search');

    // streams
    const keyup$ = fromEvent(searchBox!, 'keyup');

    // wait .5s between keyups to emit current value
    keyup$
      .pipe(
        map((i: any) => i.currentTarget.value),
        debounceTime(500)
      )
      .subscribe(console.log);
  }

  private startWithOperator() {
    const source = of(1, 2, 3);
    //start with 0
    const example = source.pipe(startWith(0));
    //output: 0,1,2,3
    const subscribe = example.subscribe(val => console.log(val));
  }

  // EX. CLICK SUBSCRIPTION
  private setClickSubscription() {
    fromEvent(this.button!.nativeElement, 'click')
      .pipe(
        // Limitamos a 10 las emisiones
        take(10),
        // Mantenemos la suscripción hasta que el subject unsubscribe$ la cancele
        takeUntil(this.unsubscribe$),
        // Imprimimos siempre que hagamos click
        tap(() => console.log('Tap!')),
        // Solo emitimos si el anterior valor se emitio hace mínimo 500ms
        debounceTime(500),
        // Se emite un primer valor sin necesidad de hacer click
        startWith(1),
        // Cada emision de tipo click event devuelve valor 1
        map((val) => typeof val === 'number' ? val : 1)
      )
      .subscribe({
        next: (counter) => {
          this.clickCounter += counter;
          console.log('Valid click n.', this.clickCounter);
        },
        complete: () => console.log('Me completé'),
        error: () => console.log('Fallé')
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
