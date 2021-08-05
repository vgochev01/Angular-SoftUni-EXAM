import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelComponent } from './hotel/hotel.component';
import { RouterModule } from '@angular/router';
import { HotelsRoutingModule } from './hotels-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';



@NgModule({
  declarations: [
    HotelsComponent,
    HotelComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    SharedModule
  ],
  exports: [
    HotelsComponent,
    HotelComponent,
    CreateComponent
  ]
})
export class CatalogModule { }
