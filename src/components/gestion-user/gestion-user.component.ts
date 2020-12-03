import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthUserService} from '../../services/auth-user.service';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector:  'app-gestion-user',
  template: `
    <app-header-gestion-user></app-header-gestion-user>
    <main>
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
}
