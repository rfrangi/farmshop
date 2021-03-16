
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GestionUserComponent} from '../../components/gestion-user/gestion-user.component';
import {LoginFormComponent} from '../../components/gestion-user/login/login-form.component';
import {SignupComponent} from '../../components/gestion-user/signup/signup.component';
import {MyAccountComponent} from '../../components/gestion-client/my-account/my-account.component';
import {ForgotPasswordComponent} from '../../components/gestion-user/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', component: GestionUserComponent, children: [
      { path: '',  redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginFormComponent, data: { animation: 'loginPage'} },
      { path: 'signup', component: SignupComponent, data: { animation: 'signPage'} },
      { path: 'forgot-password', component: ForgotPasswordComponent, data: { animation: 'forgotPasswordPage'} },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GestionUserRoutingModule { }
