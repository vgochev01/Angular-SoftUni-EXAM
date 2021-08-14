import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthActivate],
        data: {
            authRequired: false
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthActivate],
        data: {
            authRequired: false
        }
    }, 
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthActivate],
        data: {
            authRequired: true
        }
    }
];

export const UserRoutingModule = RouterModule.forChild(routes);