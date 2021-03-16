import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';

@Component({
  selector:  'app-my-orders',
  template: `
      <div>
        <h1>Mes Produits</h1>
      </div>
  `,
  styleUrls: ['./my-products.component.scss']

})
export class MyProductsComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService,
              private router: Router) {}
  ngOnInit(): void {
  }
}
