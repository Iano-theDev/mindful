import { Routes } from '@angular/router'
import { authGuard } from './features/auth/auth.guard'
import { LayoutComponent } from './layout/layout/layout.component'
import { UserProfileComponent } from './features/users/user-profile/user-profile.component'
import { UsersListComponent } from './features/users/users-list/users-list.component'
import { HomeComponent } from './layout/home/home.component'

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES)
    },
    {
        path: '',
        loadComponent: () => import('./layout/layout.routes').then(c => LayoutComponent),
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./layout/home/home.component').then(c => HomeComponent)
            },
            {
                path: 'users',
                children: [
                    {
                        path: 'profile/:id',
                        loadComponent: () => import('./features/users/user-profile/user-profile.component').then(c => UserProfileComponent) 
                    },
                    {
                        path: 'list',
                        loadComponent: () => import('./features/users/users-list/users-list.component').then(c => UsersListComponent) 
                    },
                ]
            },

        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
]
