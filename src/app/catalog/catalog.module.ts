import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelComponent } from './hotel/hotel.component';



@NgModule({
  declarations: [
    HotelsComponent,
    HotelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HotelsComponent,
    HotelComponent
  ]
})
export class CatalogModule { }
