import {Component, ElementRef, ViewChild} from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-header',
  template: `
    <div class="toolbar" role="banner">
      <div class="title">
        <span>
        </span>
      </div>
      <div class="action-icon">
        <a [routerLink]="['/utilisateur']">
          <mat-icon aria-label="Icon identity">perm_identity</mat-icon>
          <span>{{labelUsername}}</span>
        </a>
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

  constructor(private tokenStorage: TokenStorageService) {}

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
}
