import { Routes } from '@angular/router'
import { authGuard } from './features/auth/auth.guard'

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES)
    },
       {
        path: 'layout',
        loadChildren: () => import('./layout/layout.routes').then(r => r.LAYOUT_ROUTES),
        canActivate: [authGuard]
    }
    
]