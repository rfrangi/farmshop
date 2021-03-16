import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector:  'app-home',
  template: `
    <app-header></app-header>
    <main>
      <div class="col col1">
          <img src="assets/produits-locaux.jpg" alt="produits-locaux"/>
        </div>
      <div class="col2 col">
        <div class="description-farm-store">
          Découvrez <span>les produits locaux</span> de vos fermiers, éleveurs
          <br/>pour votre intérêt, celui du producteur et de notre chère planète !
          <br/><br/>Comparez, évaluez pour que chacun puisse consommer mieux et moins chère
        </div>
        <div class="bandeau-bienvenue">
          <span class="title-offre">5€ offerts dès 50€ d'achats</span>
          <span class="description-offre">Sur votre première commade avec le code</span><span class="code-offre">Bienvenue</span>
        </div>
      </div>
      <div class="bloc-description-livraison">
        <h2>Gagner du temps</h2>

      </div>
    </main>
  `,
  styleUrls: ['./home.component.scss']

})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.router = router;
    this.route = route;
  }

  ngOnInit(): void {}
}
