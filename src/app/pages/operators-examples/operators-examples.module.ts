import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OperatorsExamplesComponent } from './operators-examples.component';

const routes: Routes = [{
  path: '',
  component: OperatorsExamplesComponent
}];

@NgModule({
  declarations: [
    OperatorsExamplesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class OperatorsExamplesModule { }
