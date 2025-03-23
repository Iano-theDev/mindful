import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    console.log("Inside auth service login, data is: ", data)
    return this.http.post(environment.MINDFUL_SERVER_URL + "/auth/login", data)
  }
}
