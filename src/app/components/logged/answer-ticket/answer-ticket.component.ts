import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Ticket } from 'src/app/models/Ticket.model';
import { TicketsService } from 'src/app/services/tickets.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-answer-ticket',
  templateUrl: './answer-ticket.component.html',
  styleUrls: ['./answer-ticket.component.scss']
})
export class AnswerTicketComponent implements OnInit {

  constructor(private ticketService: TicketsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  actualTicket$: Observable<Ticket> = this.activatedRoute.params.pipe(
    switchMap(params => {
      return this.ticketService.getTicketById(params.id);
    })
  )
  infoTicket: Ticket;

  newTicket: Ticket;
  ticketForm: FormGroup

  ngOnInit(): void {
    this.ticketForm = new FormGroup({
      'answer': new FormControl(null, Validators.required)
    });
    this.actualTicket$.subscribe(res => {
      this.infoTicket = res;
    });

  }


  answerCurrentTicket(ticketForm) {

    this.infoTicket.answer = ticketForm.value.answer;
    this.infoTicket.answerAuthor = localStorage.getItem('Username');
    this.infoTicket.answered = true;
    this.infoTicket.closingDate = new Date();

    console.log(this.infoTicket);



    this.ticketService.update(this.infoTicket).toPromise().then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Edit Ticket',
        text: 'Ticket updated correctly'
      });
      this.goBack()
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
