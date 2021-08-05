import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../guards/auth.guard';
import { OwnerActivate } from '../guards/owner.guard';
import { CreateComponent } from './create/create.component';
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
                component: HotelComponent,
                canActivate: [OwnerActivate]
            }
        ]
    }
];

export const HotelsRoutingModule = RouterModule.forChild(routes);