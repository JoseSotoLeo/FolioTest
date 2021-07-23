import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/logged/dashboard/dashboard.component';
import { AddTicketComponent } from './components/logged/add-ticket/add-ticket.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/helpers/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { EditTicketComponent } from './components/logged/edit-ticket/edit-ticket.component';
import { AnswerTicketComponent } from './components/logged/answer-ticket/answer-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddTicketComponent,
    NavbarComponent,
    EditTicketComponent,
    AnswerTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
