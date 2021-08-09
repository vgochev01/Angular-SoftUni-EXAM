import { RouterModule, Routes } from '@angular/router';
import { OwnerActivate } from '../guards/owner.guard';
import { EditComponent } from './edit/edit.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelsComponent } from './hotels/hotels.component';

const routes: Routes = [
    {
        path: 'hotels',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: HotelsComponent
            },
            {
                path: ':id',
                component: HotelComponent
            },
            {
                path: 'edit/:id',
                component: EditComponent,
                canActivate: [OwnerActivate]
            }
        ]
    }
];

export const HotelsRoutingModule = RouterModule.forChild(routes);