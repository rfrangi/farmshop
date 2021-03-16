import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {GestionClientRoutingModule} from './gestion-client-routing.module';
import {SharedModule} from '../shared/shared.module';
import {GestionClientComponent} from '../../components/gestion-client/gestion-client.component';
import {MyAccountComponent} from '../../components/gestion-client/my-account/my-account.component';
import {MyOrdersComponent} from '../../components/gestion-client/my-orders/my-orders.component';
import {MenuClientComponent} from '../../components/gestion-client/menu-client/menu-client.component';
import {MyProductsComponent} from '../../components/gestion-client/my-products/my-products.component';

@NgModule({
  declarations: [
    GestionClientComponent,
    MyAccountComponent,
    MyOrdersComponent,
    MenuClientComponent,
    MyProductsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GestionClientRoutingModule
  ]
})
export class GestionClientModule { }

