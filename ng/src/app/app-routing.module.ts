import { NotfoundComponent } from './notfound/notfound.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models';

import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { InspireComponent } from './inspire/inspire.component';
import { MenuComponent } from './menu/menu.component';
import { TravelmapComponent } from './travelmap/travelmap.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { BloggerComponent } from './blogger/blogger.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inspire', component: InspireComponent },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'whishlist',
    component: WishlistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blogger',
    component: BloggerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'travelmap',
    component: TravelmapComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  // otherwise redirect to home
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
