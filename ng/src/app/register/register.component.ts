import { EndpointService } from '../_services/enpoint.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharingService } from '@app/_services/DataSharingService.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  errorMessage = '';
  error = '';
  isLoggedIn: boolean = false;
  registerform = new FormGroup({
    name: new FormControl(''),
    lname: new FormControl(''),
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private endpService: EndpointService,
    private dataSharingService: DataSharingService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registerSubmit() {
    let data: any = this.registerform.value;
    this.endpService.saveUser(data).subscribe(
      (data: any) => {
        this.router.navigate(['/login']);
        this.dataSharingService.isUserLoggedIn.next(false);
        this.toastr.success(
          'User created successfully. Please login...',
          'New User'
        );
      },
      (error: any) => {
        this.errorMessage = 'Please check your info...';
        this.error = error;

        if (error.status == 404)
          this.errorMessage = 'Please check your info...';
        if (error.status == 401)
          this.errorMessage = 'This username is already exists!';
      }
    );
  }
}
