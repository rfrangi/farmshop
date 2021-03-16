import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';

@Component({
  selector:  'app-menu-client',
  template: `
    <div class="menu">
      <ul>
        <li [class.active]="isActive('mon-compte')"
            (click)="goToUrl(['client', 'mon-compte'])">
          Mon compte
        </li>
        <li [class.active]="isActive('mes-commandes')"
            (click)="goToUrl(['client', 'mes-commandes'])">
          Mes commandes
        </li>
        <li [class.active]="isActive('mes-produits')"
            (click)="goToUrl(['client', 'mes-produits'])">
          Mes produits
        </li>
        <li [class.active]="isActive('mes-producteurs')"
            (click)="goToUrl(['client', 'mes-producteurs'])">
          Mes producteurs
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./menu-client.scss']

})
export class MenuClientComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService,
              private router: Router) {}
  ngOnInit(): void {
  }

  goToUrl(urls: Array<string> = []): void {
    this.router.navigate(urls);
  }

  isActive(name: string): boolean {
    return this.router.url.includes(name);
  }
}
