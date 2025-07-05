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
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/auth.service';


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
    router = inject(Router)
    authService = inject(AuthService)

    sidebarVisible: boolean = false;
    showFullMenu: boolean = false;

    ngOnInit() {
        console.log("Layout: ", this.layoutService._drawerVisible)
        this.items = [
            {
                items: [
                    {
                        label: '',
                        icon: 'pi pi-bars',
                        command: () => {this.toggleFullMenu(); console.log("Showfull menu : ", this.showFullMenu)}
                    },
                    {
                        label: 'People',
                        icon: 'pi pi-users',
                        command: () => this.router.navigate(['/users/list'])
                    },
                    {
                        label: 'Therapists',
                        icon: 'pi pi-briefcase',
                        command: () => this.router.navigate(['/users/list'])
                    }
                ]
            },
            {
                // label: 'Profile',
                icon: 'pi pi-user',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog'
                    },
                    {
                        label: 'view',
                        icon: 'pi pi-user',
                        command: () => this.router.navigate(['/users/profile'])
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: () => this.authService.logout()
                    }
                ]
            },

        ];
    }

    onMenuItemClick(item: any) {
        if (item.command) {
            item.command()
            this.layoutService.closeDrawer();
        }
        
        this.layoutService.closeDrawer();
    }

    toggleFullMenu() {
        this.showFullMenu = !this.showFullMenu
    
    }
}
