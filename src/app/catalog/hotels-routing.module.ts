import { RouterModule, Routes } from '@angular/router';
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
            }
        ]
    }
];

export const HotelsRoutingModule = RouterModule.forChild(routes);