import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    loginForm: FormGroup;

    password!: string;
    email!: string;

    constructor(public layoutService: LayoutService, private authService: AuthService, private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        })
     }

    onSubmit() {
        console.log("Login Form values: ", this.loginForm.value)
        
        this.authService.login(this.loginForm.value).subscribe({
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
