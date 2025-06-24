import { Component } from '@angular/core'
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';


@Component({
    selector: 'app-top-bar',
    imports: [ToolbarModule, ButtonModule],
    templateUrl: './top-bar.component.html',
    styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

}
