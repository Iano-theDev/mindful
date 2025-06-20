import {Routes} from '@angular/router'

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('../auth/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'signup',
        loadComponent: () => import('../auth/signup/signup.component').then(c => c.SignupComponent)
    }
]
