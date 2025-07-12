import { Component } from '@angular/core';
import { AuthService } from 'src/app/features/auth/auth.service';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { COMMON_IMPORTS } from 'src/app/shared/common.imports';
import { PRIMENG_IMPORTS } from 'src/app/shared/primeng.imports';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    imports: [PRIMENG_IMPORTS, COMMON_IMPORTS],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export class SignupComponent {
    valCheck: string[] = ['remember'];
    registered: boolean = false

    //   password!: string;
    //   email!: string;
    //   firstName!: string;

    accountTypes = [
        { name: 'Client', code: "client" },
        { name: 'Therapist', code: "therapist" },
        { name: 'Student Therapist', code: "studentTherapist" },
    ]

    signupForm: FormGroup;

    constructor(private authService: AuthService, private fb: FormBuilder, private messageService: MessageService, public router: Router) {
        this.signupForm = this.fb.group({
            role: ["", [Validators.required]],
            firstName: ["", [Validators.required, Validators.minLength(3)]],
            lastName: ["", [Validators.required, Validators.minLength(3)]],
            userName: ["", [Validators.required, Validators.minLength(5)]],
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required]],
        })
    }

    onSubmit() {
        console.log("singnup form: ", this.signupForm)
        if (this.signupForm.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Validation Failed',
                detail: 'Please correct the errors in the form.'
            });
            return;
        }

        this.authService.signup(this.signupForm.value).subscribe({
            next: (res) => {
                console.log("Res is: ", res)
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message })
                this.router.navigate(['/auth/login'])
            },
            error: err => {
                console.log("An Error has occured while logging in: ", err)
                this.messageService.add({ severity: 'error', summary: 'Failed', detail: err.error.error })
            },
            complete: () => {
                console.log("We have completed executing the auth service inside the login component ")
            }
        })
    }

}
