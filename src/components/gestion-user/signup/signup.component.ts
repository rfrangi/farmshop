import { Component, OnInit } from '@angular/core';
import {AuthUserService} from '../../../services/auth-user.service';
import {User} from '../../../models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LIST_PAYS, Pays} from '../../../models/pays.model';

@Component({
  selector:  'app-signup',
  template: `

    <div class="fil-ariane">
      <span [class.isActive]="step ==1"
            [class.isPrevious]="step >= 1"
            (click)="changeStep(1)">
        Mes identifiants
      </span>
      <mat-icon>chevron_right</mat-icon>
      <span [class.isActive]="step ==2"
            [class.isPrevious]="step >= 2"
            (click)="changeStep(2)">
        Mes informations
      </span>
      <mat-icon>chevron_right</mat-icon>
      <span [class.isActive]="step ==3"
            [class.isPrevious]="step >= 3"
            (click)="changeStep(3)">
        Mon adresse
      </span>
    </div>

    <div class="bloc-indentifiant" *ngIf="step == 1">
      <h1>Mes identifiants</h1>
      <form [formGroup]="identifiantForm" novalidate  (ngSubmit)="submitStep1()">
        <mat-form-field class="mat-form-field-email">
          <input matInput
                 placeholder="Email"
                 maxlength="51"
                 minlength="6"
                 type="text"
                 formControlName="email"
                 required>
          <mat-icon matSuffix color="primary">email</mat-icon>
          <mat-error *ngIf="hasError(identifiantForm, 'email', 'required')">Veuillez saisir une adresse mail</mat-error>
          <mat-error *ngIf="hasError(identifiantForm, 'email', 'email')">Veuillez saisir une adresse mail valide</mat-error>
          <mat-error *ngIf="(hasError(identifiantForm, 'email', 'minlength')
          || hasError(identifiantForm, 'email', 'maxlength')) &&
           !hasError(identifiantForm, 'email', 'email')">
            Votre mail doit contenir entre 6  et 50 caractères
          </mat-error>
        </mat-form-field>
        <mat-form-field>
          <input matInput
                 name="password"
                 maxlength="51"
                 minlength="8"
                 formControlName="password"
                 placeholder="Mot de passe"
                 [type]="hide ? 'password' : 'text'"
                 autocomplete="on"
                 required>
          <mat-icon matSuffix color="primary" (click)="hide = !hide">
            {{hide ? 'visibility_off' : 'visibility'}}
          </mat-icon>
         <mat-error *ngIf="hasError(identifiantForm, 'password', 'required')">Veuillez saisir un mot de passe</mat-error>
          <mat-error *ngIf="hasError(identifiantForm, 'password', 'minlength')
          || hasError(identifiantForm, 'password', 'maxlength')">
            Votre mot de passe doit contenir entre 8  et 50 caractères
          </mat-error>

        </mat-form-field>

        <mat-slide-toggle color="primary">Recevoir les offres de FarmShop</mat-slide-toggle>
        <button mat-raised-button color="primary" type="submit">Suivant</button>
      </form>
    </div>

    <div class="bloc-info-personnelles" *ngIf="step == 2">
      <h1>Mes Informations personnelles</h1>
      <form [formGroup]="infoPersoForm" novalidate (ngSubmit)="submitStep2()">

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
          <mat-error *ngIf="hasError(infoPersoForm, 'firstname', 'minlength')
          || hasError(infoPersoForm, 'firstname', 'maxlength')">
              Votre prénom doit contenir entre 3  et 50 caractères
          </mat-error>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit">Suivant</button>
      </form>
    </div>

    <div class="bloc-adresse" *ngIf="step == 3">
      <h1>Mon adresse</h1>
      <form [formGroup]="adresseForm" novalidate (ngSubmit)="submitStep3()">
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
              <mat-option [value]="pays">{{ pays.label }}</mat-option>
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
        <button mat-raised-button color="primary" type="submit">Valider</button>
      </form>
    </div>
  `,
  styleUrls: ['./signup.component.scss']

})
export class SignupComponent implements OnInit {

  hide = true;
  step: number;

  identifiantForm: FormGroup;
  infoPersoForm: FormGroup;
  adresseForm: FormGroup;
  listPays: Array<Pays> = Object.values(LIST_PAYS);

  constructor(private authService: AuthUserService) { }

  ngOnInit(): void  {
    this.step = 1;

    this.identifiantForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ])
    });

    this.infoPersoForm = new FormGroup({
      civilite: new FormControl('Madame', [
        Validators.required,
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])
    });

    this.adresseForm = new FormGroup({
      adresse: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      complement: new FormControl('', [
        Validators.maxLength(100)
      ]),
      codePostal: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ]),
      ville: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]),
      pays: new FormControl(LIST_PAYS.FRANCE, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      description: new FormControl('', [
        Validators.maxLength(200)
      ])
    });
  }

  submitStep1(): void {
    if (this.identifiantForm.valid) {
      this.step++;
    }
  }

  submitStep2(): void {
    if (this.infoPersoForm.valid) {
      this.step++;
    }
  }

  submitStep3(): void {
    if (this.adresseForm.valid) {
      const data = {
        adresse: {}
      };
      Object.assign(data, this.identifiantForm.value);
      Object.assign(data, this.infoPersoForm.value);
      Object.assign(data.adresse, this.adresseForm.value);
      console.log(this.identifiantForm.value, this.infoPersoForm.value, this.adresseForm.value, data);
    }
  }

  changeStep(stepForm: number): void {
    if (this.step >= stepForm) {
      this.step = stepForm;
    }
  }

  public hasError = (form: any, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }
}
