import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { byTestId } from '@ngneat/spectator';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;
  const createComponent = createComponentFactory({
    component: HomeComponent,
    imports: [
      RouterTestingModule,
    ],
  });

  beforeEach(() => spectator = createComponent({}));

  it('should render title correctly', () => {
    const pageTitle = spectator.query(byTestId('pageTitle'));
    expect(pageTitle?.textContent).toBe('Esta es la página home!');
  });

});