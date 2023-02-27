import { Spectator, createRoutingFactory } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';

const initialState = { loading: false };

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createRoutingFactory({
    component: AppComponent,
    stubsEnabled: false,
    providers: [
      provideMockStore({ initialState }),
    ],
    routes: [{
      path: '',
      component: AppComponent
    }]
  });

  beforeEach(() => spectator = createComponent());

  it('should create the app', () => {
    expect(spectator.component).toBeDefined();
  });

  it(`should have variable title with value 'Bienvenidos al repo de Angular Testing, Store and more!'`, () => {
    expect(spectator.component.title).toEqual('Bienvenidos al repo de Angular Testing, Store and more!');
  });

  it('should render title variable on component', () => {
    expect(spectator.query('.title')).toContainText('Bienvenidos al repo de Angular Testing, Store and more!');
  });
});
