import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { MessageService } from 'primeng/api';
import { PRIMENG_IMPORTS } from 'src/app/shared/primeng.imports';
import { COMMON_IMPORTS } from 'src/app/shared/common.imports';


@Component({
  selector: 'app-users-list',
  imports: [PRIMENG_IMPORTS, COMMON_IMPORTS],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit{
  
  usersService = inject(UsersService);
  messageService = inject(MessageService);
  users: any[] = [];

  ngOnInit () {
    this.usersService.getAllUsers().subscribe( {
      next: (res: any) => {console.log("In userss list compoent, users got: ", res);
         this.users  = res.users
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message })
        },
      error: err => { console.log("Error in users list component is : ", err)},
      complete: ()=> {},
    })
  }

  getActiveRoles(rolesObj: any) {
    return Object.values(rolesObj).filter((role: any) => role.active).map((role: any)=> role.label)
  }
}
