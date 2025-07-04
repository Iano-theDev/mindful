import { Routes } from '@angular/router'
import { authGuard } from './features/auth/auth.guard'
import { LayoutComponent } from './layout/layout/layout.component'

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES)
    },
    {
        path: '',
        loadComponent: () => import('./layout/layout.routes').then(c => LayoutComponent),
        canActivate: [authGuard],
        children: []
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
]
