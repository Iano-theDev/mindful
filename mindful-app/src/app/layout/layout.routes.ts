import {Routes} from '@angular/router'

export const LAYOUT_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('../layout/layout/layout.component').then(c => c.LayoutComponent)
    }
]
