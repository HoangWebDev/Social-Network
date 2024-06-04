import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const loginGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if (sessionStorage.getItem('token')) {
    return true;
  } else {
    window.location.href = '/login';
    return false;
  }
};
