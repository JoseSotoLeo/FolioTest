import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Ticket } from 'src/app/models/Ticket.model';
import { TicketsService } from 'src/app/services/tickets.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent implements OnInit {

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
      'message': new FormControl(null, Validators.required)
    });
    this.actualTicket$.subscribe(res => {
      this.infoTicket = res;
      this.ticketForm.get('message').setValue(res.message)
    });

  }


  editCurrentTicket(ticketForm) {

    this.infoTicket.message = ticketForm.value.message;
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
