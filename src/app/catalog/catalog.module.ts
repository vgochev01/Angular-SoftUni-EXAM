import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelComponent } from './hotel/hotel.component';
import { RouterModule } from '@angular/router';
import { HotelsRoutingModule } from './hotels-routing.module';



@NgModule({
  declarations: [
    HotelsComponent,
    HotelComponent
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule
  ],
  exports: [
    HotelsComponent,
    HotelComponent
  ]
})
export class CatalogModule { }
