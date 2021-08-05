import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../guards/auth.guard';
import { LoginComponent } from './login/login.component';
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
    }
];

export const UserRoutingModule = RouterModule.forChild(routes);