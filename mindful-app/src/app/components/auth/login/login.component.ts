import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

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
