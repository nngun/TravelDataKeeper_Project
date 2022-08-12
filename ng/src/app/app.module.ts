import { EndpointService } from './_services';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import tr from '@angular/common/locales/tr';
import { registerLocaleData } from '@angular/common';
import { NotfoundComponent } from './notfound/notfound.component';
import { InspireComponent } from './inspire/inspire.component';
import { MenuComponent } from './menu/menu.component';
import { TravelmapComponent } from './travelmap/travelmap.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { BloggerComponent } from './blogger/blogger.component';
import { RegisterComponent } from './register/register.component';
import { DataSharingService } from './_services/DataSharingService.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { ShowthousandonlyPipe } from './showthousandonly.pipe';
registerLocaleData(tr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,
    NotfoundComponent,
    InspireComponent,
    MenuComponent,
    TravelmapComponent,
    WishlistComponent,
    BloggerComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot({ preventDuplicates: true, countDuplicates: true }),
    BrowserAnimationsModule,
    ColorPickerModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    Ng2GoogleChartsModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    EndpointService,
    DataSharingService,
    { provide: LOCALE_ID, useValue: 'tr' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
