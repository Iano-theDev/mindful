import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN = 'auth_token'

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any): Observable<any> {
    console.log("Inside auth service login, data is: ", data)
    return this.http.post(environment.MINDFUL_SERVER_URL + "/auth/login", data).pipe(
      tap(response => {
        if (response?.token) {
          localStorage.setItem(this.AUTH_TOKEN, response.token)
        }
      })
    )
  }

  signup(data: any): Observable<any> {
    console.log("Inside auth service signup, data is: ", data)
    return this.http.post(environment.MINDFUL_SERVER_URL + "/users", data)
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token')
    return !!token
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
