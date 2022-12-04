import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';


@Injectable({ providedIn: 'root' })


export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser.token != undefined) {
      console.log("el usuario esta logueado");
       return true;
    }

    console.log("el usuario NO esta logueado");
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
