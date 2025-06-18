import { Component } from '@angular/core';
import { AuthService } from 'src/app/features/auth/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';


@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ReactiveFormsModule,
        ToastModule,
        MessageModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
    providers: [MessageService]
})
export class SignupComponent {
    valCheck: string[] = ['remember'];
    registered: boolean = false

    //   password!: string;
    //   email!: string;
    //   firstName!: string;

    signupForm: FormGroup;

    constructor(private authService: AuthService, private fb: FormBuilder, private messageService: MessageService) {
        this.signupForm = this.fb.group({
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
