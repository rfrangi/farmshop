
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../components/home/home.component';

export const routes: Routes = [
  { path: '',  redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { animation: 'homePage'}},
  { path: 'panier', component: HomeComponent},
  { path: 'produits', component: HomeComponent},
  { path: 'producteurs', loadChildren: () => import('./producteurs/producteurs.module').then(p => p.ProducteursModule)},
  {
    path: 'utilisateur',
    data: { animation: 'moduleUser'},
    loadChildren: () => import('./gestion-user/gestion-user.module').then(p => p.GestionUserModule)
  },
  { path: 'client', loadChildren: () => import('./client/gestion-client.module').then(p => p.GestionClientModule)},

];
export const routing = RouterModule.forRoot(routes, {
  useHash: true
});

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
