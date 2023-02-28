import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class RequestService {

  public showLoading$ = new Subject<boolean>();

  constructor(
    private http: HttpClient,
  ) { }

  public get<RequestModel>(url: string): Observable<RequestModel> {
    // Mostramos loading
    this.showLoading$.next(true);
    return this.http.get(url)
      .pipe(
        // Ocultamos loading
        this.handleLoadingOperator()
      ) as Observable<RequestModel>;
  }

  /**
   * Custom operator
   */
  private handleLoadingOperator() {
    return (source: Observable<unknown>) => {
      return source.pipe(
        tap(() => this.showLoading$.next(false)),
        catchError(e => {
          this.showLoading$.next(false);
          return throwError(() => e);
        })
      );
    };
  }





  // TODO: Remove delay
  public getLoadingStatus() {
    return this.showLoading$.pipe(delay(100));
  }
}
