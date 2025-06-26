import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  let authentic = authService.isAuthenticated()

  if(authentic) {
    return authentic;
  } else {
    
    router.navigate['auth/signup'];
    return authentic;
  }
};
