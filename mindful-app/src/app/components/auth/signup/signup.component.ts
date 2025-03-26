import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/service/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ CommonModule,
          ButtonModule,
          CheckboxModule,
          InputTextModule,
          FormsModule,
          PasswordModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
      valCheck: string[] = ['remember'];
  
      password!: string;
      email!: string;
  
      constructor(public layoutService: LayoutService, private authService: AuthService) { }
  
      onSubmit() {
          console.log("Email: ", this.email)
          console.log("Password : ", this.password)
          let creds = {
              email: this.email,
              password: this.password
          }
          this.authService.login(creds).subscribe({
              next:(res) => {
                  console.log("Res is: ", res)
              },
              error: err => {
                  console.error("An Error has occured while logging in: ", err)
              },
              complete: () => {
                  console.log("We have completed executing the auth service inside the login component ")
              }
          })
      }

}
