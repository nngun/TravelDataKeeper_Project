import { EndpointService } from '../_services/enpoint.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharingService } from '@app/_services/DataSharingService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  error = '';
  isLoggedIn: boolean = false;
  loginform = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private endpService: EndpointService,
    private dataSharingService: DataSharingService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginSubmit() {
    let data: any = this.loginform.value;
    console.log(data);

    this.endpService.login(data.login, data.password).subscribe(
      (data: any) => {
        this.isLoggedIn = true;
        this.router.navigate(['/menu']);
        this.dataSharingService.isUserLoggedIn.next(true);
      },
      (error: any) => {
        this.errorMessage = 'Username or Pass is incorrect';
        this.error = error;
      }
    );
  }
}
