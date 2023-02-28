import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './core/services/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Bienvenidos al repo de Angular RxJS, NgRX, Testing and more!';
  public showLoading$?: Observable<boolean>;

  constructor(
    private requestService: RequestService,
  ) { }

  ngOnInit(): void {
    this.showLoading$ = this.requestService.getLoadingStatus();
  }
}
