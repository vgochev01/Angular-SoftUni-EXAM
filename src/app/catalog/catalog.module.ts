import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelComponent } from './hotel/hotel.component';
import { RouterModule } from '@angular/router';
import { HotelsRoutingModule } from './hotels-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    HotelsComponent,
    HotelComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    HotelsComponent,
    HotelComponent,
    CreateComponent
  ]
})
export class CatalogModule { }
