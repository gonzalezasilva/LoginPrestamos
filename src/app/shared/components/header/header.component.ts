import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from '@app/services/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public appName = 'misPrestamos.com';
  constructor(public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,) {}

  ngOnInit() {}

  onLogout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
