import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from '../layout.service';

@Component({
    selector: 'app-layout',
    imports: [RouterOutlet, SideNavComponent, ButtonModule],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss'
})
export class LayoutComponent {
    layoutService = inject(LayoutService)
}
