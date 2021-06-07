import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WaveComponent } from './wave.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
  ],
  declarations: [
    WaveComponent
  ],
  exports: [
    WaveComponent
  ]
})
export class WaveModule { }
