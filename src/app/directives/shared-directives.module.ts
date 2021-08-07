import { ParallaxDirective } from './parallax.directive';
import { HideHeaderDirective } from './hide-header.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    HideHeaderDirective,
    ParallaxDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HideHeaderDirective,
    ParallaxDirective
  ]
})
export class SharedDirectivesModule { }
