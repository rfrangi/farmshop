import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:8888/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    return this.http.get(AUTH_API + url, httpOptions);
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(AUTH_API + url, body, httpOptions);
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(AUTH_API + url, body, httpOptions);
  }

  delete(url: string): Observable<any> {
    return this.http.get(AUTH_API + url, httpOptions);
  }
}
