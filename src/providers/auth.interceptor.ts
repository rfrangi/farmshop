import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {TokenStorageService} from '../services/token-storage.service';
import {finalize} from "rxjs/operators";


const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {

    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      // for Spring Boot back-end
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    console.log('show popin during');
    return next.handle(authReq).pipe(
      finalize(() => {
        console.log('close popin during');
      })

    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
