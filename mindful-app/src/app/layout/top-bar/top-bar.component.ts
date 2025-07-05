import { Component, inject } from '@angular/core'
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { LayoutService } from '../layout.service';
import { AuthService } from 'src/app/features/auth/auth.service';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar'
import { Ripple} from 'primeng/ripple'
import { Menu } from 'primeng/menu';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-top-bar',
    imports: [CommonModule, Menubar, BadgeModule, AvatarModule, InputTextModule, ButtonModule, Menu, RouterLink],
    templateUrl: './top-bar.component.html',
    styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
     items: MenuItem[] | undefined;
     avatarMenuItems: MenuItem[] | undefined;
     layoutService = inject(LayoutService);
     authService = inject(AuthService);
     router = inject(Router)

     constructor() {}

     ngOnInit() {
        this.avatarMenuItems = [
            {
                label: '',
                icon: 'pi pi-bars',
                command: () => this.layoutService.openDrawer()
            },
            {
                label: 'Profile',
                icon: 'pi pi-user',
                command: () => this.router.navigate(['/users/profile'])
            },
            {
                label: 'Log out',
                icon: 'pi pi-sign-out',
                command: () => this.authService.logout()
            }
        ]

    this.items =  [
            {
                label: 'Home',
                icon: 'pi pi-home',
            },
            {
                label: 'Projects',
                icon: 'pi pi-search',
                badge: '3',
                items: [
                    {
                        label: 'Core',
                        icon: 'pi pi-bolt',
                        shortcut: '⌘+S',
                    },
                    {
                        label: 'Blocks',
                        icon: 'pi pi-server',
                        shortcut: '⌘+B',
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'UI Kit',
                        icon: 'pi pi-pencil',
                        shortcut: '⌘+U',
                    },
                ],
            },
        ];

     }
}
