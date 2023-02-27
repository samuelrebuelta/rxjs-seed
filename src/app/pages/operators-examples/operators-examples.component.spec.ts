import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { OperatorsExamplesComponent } from './operators-examples.component';

describe('OperatorsExamplesComponent', () => {
  let spectator: Spectator<OperatorsExamplesComponent>;
  const createComponent = createComponentFactory(OperatorsExamplesComponent);
});