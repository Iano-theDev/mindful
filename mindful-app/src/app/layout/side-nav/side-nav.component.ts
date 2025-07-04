import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { Menu } from 'primeng/menu';
import { PanelMenu } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { BadgeModule } from 'primeng/badge';
import { LayoutService } from '../layout.service';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-side-nav',
    imports: [CommonModule, DrawerModule, ToastModule, Menu, SidebarModule, ButtonModule, BadgeModule],
    templateUrl: './side-nav.component.html',
    styleUrl: './side-nav.component.scss',
    providers: [MessageService]
})
export class SideNavComponent {
    items: MenuItem[] | undefined;
    messageService = inject(MessageService);
    layoutService = inject(LayoutService);

    sidebarVisible: boolean = false;

    ngOnInit() {
        this.items = [
            {
                label: 'Documents',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-search'
                    }
                ]
            },
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog'
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out'
                    }
                ]
            }
        ];
    }
}
