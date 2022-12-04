import { User } from "./user";
import { Component, NgModule } from '@angular/core';
import { AuthenticationService } from "./services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private currentUser!: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    localStorage.removeItem('currentUser');
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
