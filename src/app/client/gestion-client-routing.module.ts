
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GestionClientComponent} from '../../components/gestion-client/gestion-client.component';
import {MyAccountComponent} from '../../components/gestion-client/my-account/my-account.component';
import {MyOrdersComponent} from '../../components/gestion-client/my-orders/my-orders.component';
import {MyProductsComponent} from '../../components/gestion-client/my-products/my-products.component';

export const routes: Routes = [
  { path: '', component: GestionClientComponent, children: [
      { path: '',  redirectTo: 'login', pathMatch: 'full' },
      { path: 'mon-compte', component: MyAccountComponent },
      { path: 'mes-commandes', component: MyOrdersComponent },
      { path: 'mes-produits', component: MyProductsComponent }

    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GestionClientRoutingModule { }
