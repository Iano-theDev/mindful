import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [
        CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        ReactiveFormsModule,
        MessageModule,
        ToastModule
    ],
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

    constructor(private authService: AuthService, private fb: FormBuilder, public router: Router, private messageService: MessageService) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        })
    }

    onSubmit() {
        console.log("Login Form values: ", this.loginForm.value)

        this.authService.login(this.loginForm.value).subscribe({
            next: (res) => {
                console.log("Res is: ", res)
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message })
                this.router.navigate(["/layout"])
            },
            error: err => {
                console.error("An Error has occured while logging in: ", err)
                this.messageService.add({ severity: 'error', summary: 'Failed', detail: err.error.error })

            },
            complete: () => {
                console.log("We have completed executing the auth service inside the login component ")
            }
        })
    }
}
