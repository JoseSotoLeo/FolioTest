import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTicketComponent } from './components/logged/add-ticket/add-ticket.component';
import { AnswerTicketComponent } from './components/logged/answer-ticket/answer-ticket.component';
import { DashboardComponent } from './components/logged/dashboard/dashboard.component';
import { EditTicketComponent } from './components/logged/edit-ticket/edit-ticket.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './security/guards/auth.guard';

const routes: Routes = [

  //public routes
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },

  //logged routes
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'addTicket', component: AddTicketComponent, canActivate: [AuthGuard] },
  { path: 'editTicket/:id', component: EditTicketComponent, canActivate: [AuthGuard] },
  { path: 'answerTicket/:id', component: AnswerTicketComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
