import {Component, ElementRef, ViewChild} from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {Router} from '@angular/router';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-header',
  template: `
    <div class="toolbar" role="banner">
      <div class="title">
        <span>
        </span>
      </div>
      <div class="action-icon">
        <a (click)="goToLoginOrMenu()" [matMenuTriggerFor]="menu">
          <mat-icon aria-label="Icon identity">perm_identity</mat-icon>
          <span>{{labelUsername}}</span>
        </a>
        <mat-menu #menu="matMenu">
          <h3> {{ labelUsername }}</h3>
          <button mat-menu-item (click)="goToUrl(['client', 'mon-compte'])">
            <mat-icon color="primary">home</mat-icon>
            <span>Mon compte</span>
          </button>
          <button mat-menu-item (click)="goToUrl(['client', 'mes-commandes'])">
            <mat-icon color="primary">shopping_cart</mat-icon>
            <span>Mes commandes</span>
          </button>
          <button mat-menu-item (click)="goToUrl(['client', 'mes-produits'])">
            <mat-icon color="primary">menu</mat-icon>
            <span>Mes produits</span>
          </button>
          <button mat-menu-item (click)="goToUrl(['client', 'mes-producteurs'])">
            <mat-icon color="primary">list</mat-icon>
            <span>Mes producteurs</span>
          </button>
          <button mat-menu-item (click)="logout()">
          <mat-icon color="primary">power_settings_new</mat-icon>
          <span>Déconnexion</span>
        </button>
        </mat-menu>
      </div>
    </div>

    <div class="header-menu">

      <div class="logo" #blockLogo [routerLink]="['/home']">
        <img src="assets/logo_F.png" alt="logo"/>
        <span>armShop</span>
      </div>

      <div class="menu-list" #blockProduit>
        <mat-icon>menu</mat-icon>
        <span>Produits</span>
      </div>

      <div class="menu-list block-search" (click)="displayZoneSearch()" #blockSearch>
        <mat-icon>search</mat-icon>
        <span>Recherche</span>
      </div>

      <form class="form-search" #formSearch>
        <mat-form-field class="input-search" [floatLabel]="'never'">
          <input matInput placeholder="Oeufs, Carottes, Oignons" name="input-search" [(ngModel)]="searchTerm">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        <div class="action-back-search" (click)="removeZoneSearch()">Annuler</div>
      </form>

      <div class="menu-list" #blockProducteurs [routerLink]="['/producteurs']">
        <mat-icon>list</mat-icon>
        <span>Producteurs</span>
      </div>

      <div class="block-panier" #blockBasket>
        <mat-icon>add_shopping_cart</mat-icon>
        <span class="price">0.00€</span>
      </div>
    </div>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchTerm: string;

  @ViewChild('formSearch') formSearch: ElementRef;

  @ViewChild('blockLogo') blockLogo: ElementRef;
  @ViewChild('blockProduit') blockProduit: ElementRef;
  @ViewChild('blockSearch') blockSearch: ElementRef;
  @ViewChild('blockProducteurs') blockProducteurs: ElementRef;
  @ViewChild('blockBasket') blockBasket: ElementRef;

  constructor(private tokenStorage: TokenStorageService,
              private router: Router,
              private toastService: ToastService) {}

  goToLoginOrMenu(): void {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['utilisateur']);
    }
  }

  get labelUsername(): string {
    return this.tokenStorage.getUser() && this.tokenStorage.getToken() ? this.tokenStorage.getUser().firstname : 'Mon compte';
  }

  displayZoneSearch(): void {
    this.blockLogo.nativeElement.classList.add('remove-block');
    this.blockProduit.nativeElement.classList.add('remove-block');
    this.blockProducteurs.nativeElement.classList.add('remove-block');
    this.blockSearch.nativeElement.classList.add('remove-block');
    this.blockBasket.nativeElement.classList.add('remove-block');
    this.formSearch.nativeElement.classList.add('display-block-search');
  }

  removeZoneSearch(): void {
    this.blockLogo.nativeElement.classList.remove('remove-block');
    this.blockProduit.nativeElement.classList.remove('remove-block');
    this.blockProducteurs.nativeElement.classList.remove('remove-block');
    this.blockSearch.nativeElement.classList.remove('remove-block');
    this.blockBasket.nativeElement.classList.remove('remove-block');
    this.formSearch.nativeElement.classList.remove('display-block-search');
  }

  logout(): void {
    this.toastService.success(`A bientot ${this.tokenStorage.getUser().firstname}`);
    this.tokenStorage.signOut();
    this.router.navigate(['home']);
  }

  goToUrl(urls: Array<string>): void {
    this.router.navigate(urls);
  }
}
