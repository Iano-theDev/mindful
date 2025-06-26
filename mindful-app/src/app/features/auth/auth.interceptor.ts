import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token')

  // clone the request n set it to a variable
  if (token) {
    const reqWithToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log("[AUTH interceptor] - reqWithToken is: ", reqWithToken)

    return next(reqWithToken)
  }

  console.log("[AUTH interceptor] - req is: ", req.headers)
  return next(req);
};
