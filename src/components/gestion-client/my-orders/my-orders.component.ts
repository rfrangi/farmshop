import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';

@Component({
  selector:  'app-my-orders',
  template: `
      <div>
        <h1>Mes commandes</h1>
      </div>
  `,
  styleUrls: ['./my-orders.component.scss']

})
export class MyOrdersComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService,
              private router: Router) {}
  ngOnInit(): void {
  }
}
