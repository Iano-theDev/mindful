import { Routes } from '@angular/router'
import { authGuard } from './features/auth/auth.guard'

export const routes: Routes = [
    {
        path: 'auth/login',
        loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./layout/layout.routes').then(r => r.LAYOUT_ROUTES),
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
]
