import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  http = inject(HttpClient)
  constructor() { }

  getAllUsers() {
    return this.http.get(environment.MINDFUL_SERVER_URL + '/users/').pipe(
      tap( data =>  console.log("Users got in usersService = ", data ))
      )
  }
}
