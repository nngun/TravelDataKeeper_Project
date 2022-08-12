// tslint:disable
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { env } from '../../environments/environment';
import { Role, User } from '../_models';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from './DataSharingService.service';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public ratios: Observable<string> | undefined;

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataSharingService: DataSharingService
  ) {
    let userString: any = localStorage.getItem('user')
      ? localStorage.getItem('user')
      : '{}';

    let localuser: User = JSON.parse(userString);
    this.userSubject = new BehaviorSubject<User>(localuser);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  routeHere(navigate: any) {
    this.router.navigate([navigate]);
  }

  login(login: string, password: string) {
    return this.http.post<any>(`${env.lookupurl}`, { login, password }).pipe(
      map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }

  updateMap(body: any, userId: any): any {
    return this.http.post(`${env.savemapurl}/${userId}`, body);
  }

  saveUser(JSON: any) {
    return this.http.post<any>(`${env.useraddurl}`, JSON);
  }

  delete(id: any): any {
    return this.http.post(`${env.userdeleteurl}/` + id, {});
  }

  public getAllUsers(): any {
    return this.http.get(`${env.userurl}`);
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(new User());
    this.router.navigate(['/']);
    this.dataSharingService.isUserLoggedIn.next(false);
  }

  getCountries() {
    return this.http.get(`${env.countriesurl}`);
  }
}
