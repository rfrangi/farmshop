import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LIST_PAYS, Pays} from '../../../models/pays.model';

@Component({
  selector:  'app-my-account',
  template: `
      <div>
        <mat-accordion class="example-headers-align">
          <mat-expansion-panel [expanded]="step === 0" (opened)="setStep(0)" [class.active]="step === 0">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon class="title-icon" color="primary">account_circle</mat-icon>
                Mon identifiant
              </mat-panel-title>
            </mat-expansion-panel-header>
            <form [formGroup]="identifiantForm" novalidate  (ngSubmit)="submitFormIdentifiant()" >
              <mat-form-field class="mat-form-field-email" disabled>
                <input matInput
                       placeholder="Email"
                       maxlength="51"
                       minlength="6"
                       type="text"
                       formControlName="email"
                       required>
                <mat-icon matSuffix [class.active]="isUpdateIdent">email</mat-icon>
                <mat-error *ngIf="hasError(identifiantForm, 'email', 'required')">Veuillez saisir une adresse mail</mat-error>
                <mat-error *ngIf="hasError(identifiantForm, 'email', 'email')">Veuillez saisir une adresse mail valide</mat-error>
                <mat-error *ngIf="(hasError(identifiantForm, 'email', 'minlength')
          || hasError(identifiantForm, 'email', 'maxlength')) &&
           !hasError(identifiantForm, 'email', 'email')">
                  Votre mail doit contenir entre 6  et 50 caractères
                </mat-error>
              </mat-form-field>
              <button *ngIf="!isUpdateIdent"
                      mat-raised-button
                      color="primary"
                      type="button" (click)="onUpdateFormIdentification()">
                Modifier
              </button>
              <ng-container *ngIf="isUpdateIdent">
                <a class="reset-form"
                   (click)="resetFormIdentification()">
                  Annuler
                </a>
                <button mat-raised-button
                        color="primary"
                        type="submit">
                  Enregistrer
                </button>
              </ng-container>
            </form>
          </mat-expansion-panel>

          <mat-expansion-panel [expanded]="step === 1" (opened)="setStep(1)" [class.active]="step === 1">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon class="title-icon" color="primary">security</mat-icon>
                Mon mot de passe
              </mat-panel-title>
            </mat-expansion-panel-header>
            <form [formGroup]="passwordForm" novalidate  (ngSubmit)="submitFormPassword()" >
              <mat-form-field>
                <input matInput
                       name="passwordOld"
                       maxlength="51"
                       minlength="8"
                       formControlName="passwordOld"
                       placeholder="Ancien Mot de passe"
                       [type]="hide ? 'password' : 'text'"
                       autocomplete="on"
                       required>
                <mat-icon matSuffix [class.active]="isUpdatePassword" (click)="hide = !hide">
                  {{hide ? 'visibility_off' : 'visibility'}}
                </mat-icon>
                <mat-error *ngIf="hasError(passwordForm, 'passwordOld', 'required')">Veuillez saisir un mot de passe</mat-error>
                <mat-error *ngIf="hasError(passwordForm, 'passwordOld', 'minlength') || hasError(passwordForm, 'passwordOld', 'maxlength')">
                  Votre mot de passe doit contenir entre 8  et 50 caractères
                </mat-error>
              </mat-form-field>

              <mat-form-field>
                <input matInput
                       name="password"
                       maxlength="51"
                       minlength="8"
                       formControlName="password"
                       placeholder="Nouveau mot de passe"
                       [type]="hide ? 'password' : 'text'"
                       autocomplete="on"
                       required>
                <mat-icon matSuffix [class.active]="isUpdatePassword" (click)="hide = !hide">
                  {{hide ? 'visibility_off' : 'visibility'}}
                </mat-icon>
                <mat-error *ngIf="hasError(passwordForm, 'password', 'required')">Veuillez saisir un mot de passe</mat-error>
                <mat-error *ngIf="hasError(passwordForm, 'password', 'minlength') || hasError(passwordForm, 'password', 'maxlength')">
                  Votre mot de passe doit contenir entre 8  et 50 caractères
                </mat-error>
              </mat-form-field>

              <mat-form-field>
                <input matInput
                       name="passwordConfirm"
                       maxlength="51"
                       minlength="8"
                       formControlName="passwordConfirm"
                       placeholder="Confirmation"
                       [type]="hide ? 'password' : 'text'"
                       autocomplete="on"
                       required>
                <mat-icon matSuffix [class.active]="isUpdatePassword" (click)="hide = !hide">
                  {{hide ? 'visibility_off' : 'visibility'}}
                </mat-icon>
                <mat-error *ngIf="hasError(passwordForm, 'passwordConfirm', 'required')">Veuillez saisir un mot de passe</mat-error>
                <mat-error *ngIf="hasError(passwordForm, 'passwordConfirm', 'minlength') || hasError(passwordForm, 'passwordConfirm', 'maxlength')">
                  Votre mot de passe doit contenir entre 8  et 50 caractères
                </mat-error>
              </mat-form-field>
              <button *ngIf="!isUpdatePassword"
                      mat-raised-button
                      color="primary"
                      type="button" (click)="onUpdateFormPassword()">
                Modifier
              </button>
              <ng-container *ngIf="isUpdatePassword">
                <a class="reset-form"
                   (click)="resetFormPassword()">
                  Annuler
                </a>
                <button mat-raised-button
                        color="primary"
                        *ngIf="isUpdatePassword"
                        type="submit">
                  Enregistrer
                </button>
              </ng-container>
            </form>
          </mat-expansion-panel>


          <mat-expansion-panel [expanded]="step === 2" (opened)="setStep(2)"  [class.active]="step === 2">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon class="title-icon">account_balance</mat-icon>
                Mes informations personnelles
              </mat-panel-title>
            </mat-expansion-panel-header>
            <form [formGroup]="infoPersoForm" novalidate (ngSubmit)="submitFormInfoPerso()">

              <mat-radio-group formControlName="civilite">
                <mat-radio-button value="Madame" color="primary">Madame</mat-radio-button>
                <mat-radio-button value="Monsieur" color="primary">Monsieur</mat-radio-button>
                <mat-error *ngIf="hasError(infoPersoForm, 'civilite', 'required')">
                  Veuillez sélectionner votre civilité
                </mat-error>
              </mat-radio-group>

              <mat-form-field class="mat-form-field-lastname">
                <input matInput
                       placeholder="Nom"
                       required
                       maxlength="51"
                       minlength="3"
                       type="text"
                       formControlName="lastname">
                <mat-error *ngIf="hasError(infoPersoForm, 'lastname', 'required')">
                  Veuillez saisir votre nom
                </mat-error>
                <mat-error *ngIf="hasError(infoPersoForm, 'lastname', 'minlength')
          || hasError(infoPersoForm, 'lastname', 'maxlength')">
                  Votre nom doit contenir entre 3  et 50 caractères
                </mat-error>
              </mat-form-field>

              <mat-form-field class="mat-form-field-firstname">
                <input placeholder="Prénom"
                       matInput
                       required
                       maxlength="51"
                       minlength="3"
                       type="text"
                       formControlName="firstname">
                <mat-error *ngIf="hasError(infoPersoForm, 'firstname', 'required')">
                  Veuillez saisir votre prénom
                </mat-error>
                <mat-error *ngIf="hasError(infoPersoForm, 'firstname', 'minlength') || hasError(infoPersoForm, 'firstname', 'maxlength')">
                  Votre prénom doit contenir entre 3  et 50 caractères
                </mat-error>
              </mat-form-field>
              <button *ngIf="!isUpdateInfoPerso"
                      mat-raised-button
                      color="primary"
                      type="button" (click)="onUpdateFormInfoPerso()">
                Modifier
              </button>
              <ng-container *ngIf="isUpdateInfoPerso">
                <a class="reset-form"
                   (click)="resetFormInfoPerso()">
                  Annuler
                </a>
                <button mat-raised-button
                        color="primary"
                        *ngIf="isUpdateInfoPerso"
                        type="submit">
                  Enregistrer
                </button>
              </ng-container>
            </form>
          </mat-expansion-panel>

          <mat-expansion-panel [expanded]="step === 3" (opened)="setStep(3)"  [class.active]="step === 3">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon class="title-icon">map</mat-icon>
                Mon adresse
              </mat-panel-title>
            </mat-expansion-panel-header>
            <form [formGroup]="adresseForm" novalidate (ngSubmit)="submitFormAdresse()">
              <mat-form-field class="mat-form-field-adresse">
                <input matInput
                       placeholder="Adresse"
                       maxlength="100"
                       minlength="10"
                       type="text"
                       formControlName="adresse"
                       required>
                <mat-error *ngIf="hasError(adresseForm, 'adresse', 'required')">
                  Veuillez saisir votre adresse
                </mat-error>
                <mat-error *ngIf="hasError(adresseForm, 'adresse', 'minlength')
          || hasError(adresseForm, 'adresse', 'maxlength')">
                  Votre adresse doit contenir entre 10  et 100 caractères
                </mat-error>
              </mat-form-field>

              <mat-form-field class="mat-form-field-compl-adresse">
                <input matInput
                       placeholder="Complément d'adresse"
                       maxlength="100"
                       type="text"
                       formControlName="complement">
                <mat-error *ngIf="hasError(adresseForm, 'complement', 'maxlength')">
                  Votre complément d'adresse doit contenir au maximum 100 caractères
                </mat-error>
              </mat-form-field>

              <mat-form-field class="mat-form-field-cp">
                <input matInput
                       placeholder="Code postal"
                       maxlength="6"
                       minlength="5"
                       size="5"
                       type="text"
                       formControlName="codePostal"
                       required>
                <mat-error *ngIf="hasError(adresseForm, 'codePostal', 'required')">
                  Veuillez saisir votre code postal
                </mat-error>
                <mat-error *ngIf="hasError(adresseForm, 'codePostal', 'minlength')
          || hasError(adresseForm, 'codePostal', 'maxlength')">
                  Votre code postal doit contenir 5 caractères
                </mat-error>
              </mat-form-field>

              <mat-form-field class="mat-form-field-ville">
                <input matInput
                       placeholder="Ville"
                       maxlength="40"
                       minlength="3"
                       type="text"
                       formControlName="ville"
                       required>
                <mat-error *ngIf="hasError(adresseForm, 'ville', 'required')">
                  Veuillez saisir votre ville
                </mat-error>
                <mat-error *ngIf="hasError(adresseForm, 'ville', 'minlength')
          || hasError(adresseForm, 'ville', 'maxlength')">
                  Votre ville doit contenir entre 3  et 40 caractères
                </mat-error>
              </mat-form-field>

              <mat-form-field class="mat-form-field-pays">
                <mat-label>Pays</mat-label>
                <mat-select formControlName="pays">
                  <ng-container *ngFor="let pays of listPays">
                    <mat-option [value]="pays.code">{{ pays.label }}</mat-option>
                  </ng-container>
                </mat-select>
              </mat-form-field>
              <mat-form-field>
                <mat-label>Instructions de livraison</mat-label>
                <textarea matInput
                          formControlName="description"
                          cdkAutosizeMinRows="1"
                          cdkAutosizeMaxRows="5">
                </textarea>
                <mat-error *ngIf="hasError(adresseForm, 'description', 'maxlength')">
                  Vos instructions doit contenir au maximum 100 caractères
                </mat-error>
              </mat-form-field>
              <button *ngIf="!isUpdateAdresse"
                      mat-raised-button
                      color="primary"
                      type="button" (click)="onUpdateFormAdresse()">
                Modifier
              </button>
              <ng-container *ngIf="isUpdateAdresse">
                <a class="reset-form"
                   (click)="resetFormAdresse()">
                  Annuler
                </a>
                <button mat-raised-button
                        color="primary"
                        *ngIf="isUpdateAdresse"
                        type="submit">
                  Enregistrer
                </button>
              </ng-container>
            </form>
          </mat-expansion-panel>
        </mat-accordion>
      </div>
  `,
  styleUrls: ['./my-account.component.scss']

})
export class MyAccountComponent implements OnInit {
  hide = true;

  step = 0;

  isUpdateIdent = false;
  isUpdatePassword = false;
  isUpdateInfoPerso = false;
  isUpdateAdresse = false;

  identifiantForm: FormGroup;
  passwordForm: FormGroup;
  infoPersoForm: FormGroup;
  adresseForm: FormGroup;

  listPays: Array<Pays> = Object.values(LIST_PAYS);

  constructor(private tokenStorage: TokenStorageService, private router: Router) {}

  ngOnInit(): void {
    this.step = 0;
    this.initFormIdentification();
    this.initFormPassword();
    this.initFormInfoPerso();
    this.initFormAdresse();
    console.log(this.tokenStorage.getUser());
  }

  initFormIdentification(): void {
    this.identifiantForm = new FormGroup({
      email: new FormControl({value: this.tokenStorage.getUser().email, disabled: !this.isUpdateIdent}, [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(50),
      ])
    });
  }

  initFormPassword(): void {
    this.passwordForm = new FormGroup({
      passwordOld: new FormControl({value: this.isUpdatePassword ? '' : '*********', disabled: !this.isUpdatePassword}, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]),
      password: new FormControl({value: this.isUpdatePassword ? '' : '*********', disabled: !this.isUpdatePassword}, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]),
      passwordConfirm: new FormControl({value: this.isUpdatePassword ? '' : '*********', disabled: !this.isUpdatePassword}, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ])

    });
  }

  initFormInfoPerso(): void {
    this.infoPersoForm = new FormGroup({
      civilite: new FormControl({value: this.tokenStorage.getUser().civilite, disabled: !this.isUpdateIdent}, [
        Validators.required,
      ]),
      lastname: new FormControl({value: this.tokenStorage.getUser().lastname, disabled: !this.isUpdateIdent}, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      firstname: new FormControl({value: this.tokenStorage.getUser().firstname, disabled: !this.isUpdateIdent}, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])
    });
  }

  initFormAdresse(): void {
    this.adresseForm = new FormGroup({
      adresse: new FormControl({value: this.tokenStorage.getUser().adresse.adresse, disabled: !this.isUpdateAdresse}, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      complement: new FormControl({value: this.tokenStorage.getUser().adresse.complement, disabled: !this.isUpdateAdresse}, [
        Validators.maxLength(100)
      ]),
      codePostal: new FormControl({value: this.tokenStorage.getUser().adresse.codePostal, disabled: !this.isUpdateAdresse}, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ]),
      ville: new FormControl({value: this.tokenStorage.getUser().adresse.ville, disabled: !this.isUpdateAdresse}, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]),
      pays: new FormControl({value: this.tokenStorage.getUser().adresse.serialize().pays, disabled: !this.isUpdateAdresse}, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      description: new FormControl({value: this.tokenStorage.getUser().adresse.description, disabled: !this.isUpdateAdresse}, [
        Validators.maxLength(200)
      ])
    });
  }

  onUpdateFormIdentification(): void {
    this.isUpdateIdent = true;
    this.initFormIdentification();
  }

  onUpdateFormPassword(): void {
    this.isUpdatePassword = true;
    this.initFormPassword();
  }

  onUpdateFormInfoPerso(): void {
    this.isUpdateInfoPerso = true;
    this.initFormInfoPerso();
  }

  onUpdateFormAdresse(): void {
    this.isUpdateAdresse = true;
    this.initFormAdresse();
  }

  logout(): void {
    this.tokenStorage.signOut();
    console.log(this.tokenStorage.getUser());
    this.router.navigate(['home']);
  }

  setStep(index: number): void {
    this.step = index;
  }

  submitFormIdentifiant(): void {
    this.isUpdateIdent = false;
    this.initFormIdentification();
  }

  submitFormPassword(): void {
    this.isUpdatePassword = false;
    this.initFormPassword();
  }

  submitFormAdresse(): void {
    this.isUpdateAdresse = false;
    this.initFormAdresse();
  }

  submitFormInfoPerso(): void {
    this.isUpdateInfoPerso = false;
    this.initFormInfoPerso();
  }

  resetFormIdentification(): void {
    this.isUpdateIdent = false;
    this.initFormIdentification();
  }

  resetFormPassword(): void {
    this.isUpdatePassword = false;
    this.initFormPassword();
  }

  resetFormAdresse(): void {
    this.isUpdateAdresse = false;
    this.initFormAdresse();
  }

  resetFormInfoPerso(): void {
    this.isUpdateInfoPerso = false;
    this.initFormInfoPerso();
  }

  public hasError = (form: any, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }
}
