import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthUserService} from '../../../services/auth-user.service';
import {TokenStorageService} from '../../../services/token-storage.service';

@Component({
  selector:  'app-my-account',
  template: `
      <div>
        <h1>Mon Compte</h1>
        <button  mat-raised-button color="primary" (click)="logout()">Deconnexion</button>
      </div>
  `,
  styleUrls: ['./my-account.scss']

})
export class MyAccountComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService,
              private router: Router) {}

  logout(): void {
    this.tokenStorage.signOut();
    console.log(this.tokenStorage.getUser());
    this.router.navigate(['home']);
  }

  ngOnInit(): void {
    if (!this.tokenStorage.getUser() || !this.tokenStorage.getToken()) {
      this.router.navigate(['utilisateur', 'login']);
    }
  }
}
