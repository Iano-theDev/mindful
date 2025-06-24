import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
    selector: 'app-layout',
    imports: [RouterOutlet, TopBarComponent, SideNavComponent],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
