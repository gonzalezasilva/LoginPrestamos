import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth.guard';
import { PeopleComponent } from './people/people.component';
import { PersonComponent } from './person/person.component';

const routes: Routes = [
  { path: 'people', component: PeopleComponent, canActivate: [AuthGuard] },
  //,children: [
  //   { path: 'people/person/id', component: PersonComponent},
  //   { path: 'people/person', component: PersonComponent}
  //] },
  { path: 'people/person/:Id', component: PersonComponent,canActivate: [AuthGuard]},
  { path: 'people/person', component: PersonComponent,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '', component:  LoginComponent },
  {path: '**', redirectTo: '/people', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: !environment.production })],
  exports: [RouterModule]
})


export class AppRoutingModule { }