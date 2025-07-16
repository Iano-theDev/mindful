import { Component, inject, OnChanges, OnInit } from '@angular/core'
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuItem, MessageService } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { LayoutService } from '../layout.service';
import { AuthService } from 'src/app/features/auth/auth.service';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar'
import { Ripple } from 'primeng/ripple'
import { Menu } from 'primeng/menu';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-top-bar',
    imports: [CommonModule, Menubar, BadgeModule, AvatarModule, InputTextModule, ButtonModule, Menu, RouterLink, ToastModule],
    templateUrl: './top-bar.component.html',
    styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {
    items: MenuItem[] | undefined;
    avatarMenuItems: MenuItem[] | undefined;
    layoutService = inject(LayoutService);
    authService = inject(AuthService);
    router = inject(Router)
    messageService = inject(MessageService);


    constructor() { }

    ngOnInit() {
        this.avatarMenuItems = [
            {
                label: 'Profile',
                icon: 'pi pi-user',
                command: () => this.router.navigate(['/users/profile'])
            },
            {
                label: 'Log out',
                icon: 'pi pi-sign-out',
                command: () => this.authService.logout().subscribe({
                    next: (res: any) => {
                        console.log("LOG OUT SUCCESS => res is: ", res)
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message })
                    },
                    error: err => {
                        console.log("LOG OUT FAILED => res is: ", err)
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.error })
                    },
                    complete: () => { localStorage.clear();}
                })
            }
        ]

        this.items = [
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
