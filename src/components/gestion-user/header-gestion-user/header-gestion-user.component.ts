import { Component, OnInit } from '@angular/core';

@Component({
  selector:  'app-header-gestion-user',
  template: `
      <div>
        <mat-icon [routerLink]="['/home']">chevron_left</mat-icon>
        <h1 class="logo" [routerLink]="['/home']">
          <img src="assets/logo_F.png" alt="logo"/>
          <span>armShop</span>
        </h1>
      </div>
  `,
  styleUrls: ['./header-gestion-user.scss']

})
export class HeaderGestionUserComponent implements OnInit {

  ngOnInit(): void {
  }
}
