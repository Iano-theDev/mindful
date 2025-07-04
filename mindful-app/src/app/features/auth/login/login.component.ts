import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PRIMENG_IMPORTS } from 'src/app/shared/primeng.imports';
import { COMMON_IMPORTS } from 'src/app/shared/common.imports';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [ PRIMENG_IMPORTS, COMMON_IMPORTS ],
    styles: []
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
                this.router.navigate(["/"])
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
