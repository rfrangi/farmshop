import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthUserService} from '../../services/auth-user.service';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector:  'app-gestion-client',
  template: `
    <app-header></app-header>
    <main class="main-header-menu">
      <app-menu-client></app-menu-client>
      <div class="content">
        <router-outlet #outlet="outlet"></router-outlet>
      </div>
    </main>
  `,
  styleUrls: ['./gestion-client.component.scss']
})
export class GestionClientComponent implements OnInit {

  constructor(private authService: AuthUserService, private tokenStorage: TokenStorageService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken(), this.tokenStorage.getUser());
   /* if (this.tokenStorage.getToken()) {
      this.router.navigate(['utilisateur', 'my-account']);
    } else {
      this.router.navigate(['utilisateur', 'login']);
    }*/
  }
}
