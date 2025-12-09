import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    // 1. Verificar sesión
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // 2. Verificar roles permitidos
    const allowedRoles = route.data['roles'] as string[] | undefined;
    const userRole = this.auth.getRole();

    if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
      const redirectPath = this.auth.redirectHomeByRole(); // siempre string
      this.router.navigate([redirectPath]);
      return false;
    }

    return true;
  }
}
