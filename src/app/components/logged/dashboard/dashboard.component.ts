import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ticket } from 'src/app/models/Ticket.model';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router, private ticketService: TicketsService) { }

  actualUser$ = localStorage.getItem('Username');

  tickets$: Observable<Ticket[]> = this.ticketService.getTickets();
  headers$: Observable<string[]> = this.tickets$.pipe(
    map(tickets => {
      return Object.keys(tickets[0])
    })
  );

  goToAddTicket() {
    this.router.navigate(['/dashboard/addTicket'])
  }

  goToEdit(id) {
    this.router.navigate(['/editTicket/' + id])
  }

  goToAnswer(id) {
    this.router.navigate(['/answerTicket/' + id])
  }

}
