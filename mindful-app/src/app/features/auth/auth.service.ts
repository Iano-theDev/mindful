import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN = 'auth_token'

  loggedIn = signal(this.isAuthenticated());

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any): Observable<any> {
    console.log("Inside auth service login, data is: ", data)
    return this.http.post(environment.MINDFUL_SERVER_URL + "/auth/login", data).pipe(
      tap(response => {
        if (response?.token) {
          localStorage.setItem(this.AUTH_TOKEN, response.token)
          this.loggedIn.set(true); 
        }
      })
    )
  }

  signup(data: any): Observable<any> {
    console.log("Inside auth service signup, data is: ", data)
    return this.http.post(environment.MINDFUL_SERVER_URL + "/auth/register", data)
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token')
    return !!token
    // return true
  }

  logout() {
    // localStorage.clear(); 
    this.router.navigate(['/auth/login']);
    this.loggedIn.set(false); 
    return this.http.get( environment.MINDFUL_SERVER_URL + "/auth/logout")
    
  }
}
