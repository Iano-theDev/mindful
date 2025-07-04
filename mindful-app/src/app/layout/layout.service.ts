import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
    readonly _drawerVisible: WritableSignal<boolean> = signal(false)

    openDrawer() {
        this._drawerVisible.set(true)
    }

    closeDrawer() {
        this._drawerVisible.set(false)
    }

    toggleDrawer() {
        this._drawerVisible.update(currentValue => !currentValue)
    }
}