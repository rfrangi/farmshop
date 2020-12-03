import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector:  'app-forgot-password',
  template: `

    <div class="bloc-forgot-password">
      <h1>Mot de passe oublié</h1>

    </div>

  `,
  styleUrls: ['./forgot-password.component.scss']

})
export class ForgotPasswordComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.router = router;
    this.route = route;
  }

  ngOnInit(): void {}
}
