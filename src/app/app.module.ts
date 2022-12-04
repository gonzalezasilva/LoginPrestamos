import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "./services/error-interceptor.service";
import { JwtInterceptor } from "./services/jwt-interceptor.service";
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { PeopleComponent } from './people/people.component';
import { PersonComponent } from './person/person.component';


@NgModule({ 
  declarations: [
    AppComponent,HeaderComponent,FooterComponent,LoginComponent,PeopleComponent,PersonComponent
    ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule ,
    BrowserAnimationsModule  ,
    HttpClientModule,
    AppRoutingModule
   ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
