import { Router } from '@angular/router';
// tslint:disable
import { EndpointService } from '../_services/enpoint.service';
import { Component, OnInit } from '@angular/core';
declare var require: any;
const moment = require('moment-timezone');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  time = moment().tz('Europe/London').add(0, 'H').format('H');

  constructor(private endpService: EndpointService) {}

  ngOnInit(): void {}

  ngOnDestroy() {}

  getUser() {
    return this.endpService.userValue.firstName;
  }

  createUser() {}
}
