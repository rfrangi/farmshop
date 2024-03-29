import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {AuthUserService} from '../../services/auth-user.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {slideInAnimation} from "../../services/animations.service";

@Component({
  selector:  'app-gestion-user',
  animations: [
    slideInAnimation
  ],
  template: `
    <app-header-gestion-user></app-header-gestion-user>
    <main [@routeAnimations]="prepareRoute(outlet)">
        <router-outlet #outlet="outlet"></router-outlet>
    </main>
  `,
  styleUrls: ['./gestion-user.component.scss']

})
export class GestionUserComponent implements OnInit {

  constructor(private authService: AuthUserService, private tokenStorage: TokenStorageService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken(), this.tokenStorage.getUser());
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['utilisateur', 'my-account']);
    } else {
      this.router.navigate(['utilisateur', 'login']);
    }
  }

  prepareRoute(outlet: RouterOutlet): void {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
