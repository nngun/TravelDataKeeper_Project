import { Component, OnInit } from '@angular/core';
import { EndpointService } from './_services';
import { User, Role } from './_models';
import { Router } from '@angular/router';
import { DataSharingService } from './_services/DataSharingService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user: User | null = new User();
  isLoggedIn: boolean = false;

  constructor(
    private dataSharingService: DataSharingService,
    private endpService: EndpointService,
    private router: Router
  ) {
    this.endpService.user.subscribe((x) => {
      this.user = x;
    });
    this.dataSharingService.isUserLoggedIn.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
    this.isLogged();
    if (this.isLoggedIn) {
      this.router.navigate(['/menu']);
    }
  }

  private isLogged() {
    let userStorage = localStorage.getItem('user');
    let user: any = userStorage ? userStorage : null;
    if (user) this.isLoggedIn = true;
  }

  get isAdmin(): boolean {
    if (this.user) {
      return this.user && this.user.role === Role.Admin;
    } else return false;
  }

  logout(): void {
    this.endpService.logout();
    this.user = null;
    this.isLoggedIn = false;
  }

  route(navigate: any): void {
    this.endpService.routeHere(navigate);
  }
}
