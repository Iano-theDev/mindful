import { ApplicationConfig } from "@angular/core";
import {importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptor } from "./features/auth/auth.interceptor";
import { MessageService } from 'primeng/api';
import { providePrimeNG } from "primeng/config";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([authInterceptor]),
        ),
        importProvidersFrom(BrowserAnimationsModule),
        MessageService,
        providePrimeNG({
            theme: {
                preset: 'aura'
            }
        })
    ]
}