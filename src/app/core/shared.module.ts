import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderStatusPipe } from './order-status.pipe';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [
    OrderStatusPipe,
  ],
  imports: [
    CommonModule,
    NgPipesModule,
  ],
  exports: [
    OrderStatusPipe,
    NgPipesModule,
  ],
})
export class SharedModule { }
