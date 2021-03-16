import { NgModule } from '@angular/core';

import { AppComponent } from '../components/app/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {HomeComponent} from '../components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthInterceptor} from '../providers/auth.interceptor';
import {SharedModule} from './shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [ AuthInterceptor ],
  bootstrap: [AppComponent]
})
export class AppModule { }
