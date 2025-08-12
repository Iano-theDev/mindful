import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { PRIMENG_IMPORTS } from 'src/app/shared/primeng.imports';

@Component({
  selector: 'app-user-profile',
  imports: [PRIMENG_IMPORTS],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  usersService = inject(UsersService);
  messageService = inject(MessageService);
  router = inject(ActivatedRoute)

  ngOnInit() {
    const userId = this.router.snapshot.paramMap.get('id')
    if (userId) {

      this.usersService.getSingleUser(userId).subscribe({
        next: res => { console.log("UserProfileComponent, res: ", res)},
        error: err => {console.log("UserProfileComponent, err: ", err)},
        complete: () => {}
      })
    }
  }

}
