import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuMaskDirective} from './au-mask.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AuMaskDirective],
  exports: [
    AuMaskDirective
  ]
})
export class AuMaskModule { }
