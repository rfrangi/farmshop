import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {HeaderComponent} from '../../components/header/header.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';


import {PopinMessageDuringComponent} from '../../components/shared/popins/popinMessageDuring/popin-message-during.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PopinMessageDuringComponent
  ],
  entryComponents: [
    PopinMessageDuringComponent,
  ],
  exports: [
    HeaderComponent,

    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTreeModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDialogModule
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTreeModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDialogModule
  ]
})
export class SharedModule { }
