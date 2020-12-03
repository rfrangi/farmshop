import { NgModule } from '@angular/core';
import {GestionUserRoutingModule} from './gestion-user-routing.module';
import {LoginFormComponent} from '../../components/gestion-user/login/login-form.component';
import {MyAccountComponent} from '../../components/gestion-user/my-account/my-account.component';
import {SignupComponent} from '../../components/gestion-user/signup/signup.component';
import {GestionUserComponent} from '../../components/gestion-user/gestion-user.component';
import {SharedModule} from '../shared/shared.module';
import {ForgotPasswordComponent} from '../../components/gestion-user/forgot-password/forgot-password.component';
import {CommonModule} from '@angular/common';
import {HeaderGestionUserComponent} from '../../components/gestion-user/header-gestion-user/header-gestion-user.component';

@NgModule({
  declarations: [
    MyAccountComponent,
    LoginFormComponent,
    SignupComponent,
    GestionUserComponent,
    ForgotPasswordComponent,
    HeaderGestionUserComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    GestionUserRoutingModule
  ]
})
export class GestionUserModule { }
