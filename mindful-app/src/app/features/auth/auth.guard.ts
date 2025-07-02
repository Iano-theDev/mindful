import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  let authentic = authService.isAuthenticated()

  
  if(authentic) {
    console.log("Login is authentic ", authentic)
    // router.navigate(['layout']);
    return true;
  } else {
    console.log("Login not authentic ", authentic)
    
    router.navigate(['/auth/login']);
    return false;
  }
};
