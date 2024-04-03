import { Routes } from '@angular/router';
import { RegisterComponent } from '../../pages/register/register.component';
import { CreateApplicationComponent } from '../../pages/create-application/create-application.component';
import { MyApplicationsComponent } from '../../pages/my-applications/my-applications.component';
import { AuthComponent } from '../../pages/auth/auth.component';

export const routes: Routes = [
    {
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent,
        canActivate: []
    },
    {
        path: 'auth',
        pathMatch: 'full',
        component: AuthComponent,
        canActivate: []
    },
    {
        path: 'create-application',
        pathMatch: 'full',
        component: CreateApplicationComponent,
        canActivate: []
    },
    {
        path: 'my-applications',
        pathMatch: 'full',
        component: MyApplicationsComponent,
        canActivate: []
    },
    {
        path: '**',
        redirectTo: 'register'
    },
];
