import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthUserService} from '../../../services/auth-user.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector:  'app-login-form',
  template: `
    <div class="bloc-login-form">
      <h1>Je me connecte</h1>
      <form [formGroup]="loginForm" autocomplete="off" novalidate (ngSubmit)="submit(loginForm.value)">
        <mat-form-field class="mat-form-field-email">
          <input matInput placeholder="Email" formControlName="email" required>
          <mat-icon matSuffix color="primary">email</mat-icon>
          <mat-error *ngIf="hasError('email', 'required')">Veuillez saisir une adresse mail</mat-error>
          <mat-error *ngIf="hasError('email', 'email')">Veuillez saisir une adresse mail valide</mat-error>
        </mat-form-field>
        <mat-form-field>
          <input matInput
                 placeholder="Mot de passe"
                 [type]="hide ? 'password' : 'text'"
                 formControlName="password"
                 name="password"
                 autocomplete="on"
                 required>
            <mat-icon matSuffix color="primary" (click)="hide = !hide">
                {{hide ? 'visibility_off' : 'visibility'}}
            </mat-icon>
          <mat-error *ngIf="hasError('password', 'required')">Veuillez saisir un mot de passe</mat-error>
        </mat-form-field>
        <mat-checkbox color="primary">Se souvenir de moi</mat-checkbox>
        <span class="link-forgot-password"
              [routerLink]="['/utilisateur/forgot-password']">Oups! J'ai oublié mon mot de passe</span>
        <button
          mat-raised-button color="primary"
          name="btn-valider" type="submit">Connexion</button>
      </form>
    </div>
    <div class="bloc-add-user">
      <h1>Nouvel utilisateur ?</h1>
      <button mat-raised-button
              color="primary"
              name="btn-add-user"
              type="button"
              [routerLink]="['/utilisateur/signup']">
        Inscription
      </button>
    </div>
  `,
  styleUrls: ['./login-form.component.scss']

})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  error: string;

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthUserService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['home']);
  }

  ngOnInit(): void {
    if (this.tokenStorage.getUser() && this.tokenStorage.getToken()){
      this.router.navigate(['utilisateur', 'my-account']);
    }
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  submit(value: any): void {
    console.log(this.loginForm, value);
    if (this.loginForm.valid) {
      this.authService.login(value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          console.log(this.tokenStorage.getUser());
          this.isLoginFailed = false;
          this.router.navigate(['utilisateur', 'my-account']);

        },
        err => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    } else {
      console.log('login invalid');
    }
  }
}
