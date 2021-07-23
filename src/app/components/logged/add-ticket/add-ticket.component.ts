import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/Ticket.model';
import { TicketsService } from 'src/app/services/tickets.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {

  constructor(private ticketService: TicketsService, private router: Router) { }

  newTicket: Ticket;
  ticketForm: FormGroup

  ngOnInit(): void {
    this.ticketForm = new FormGroup({
      'message': new FormControl(null, Validators.required)
    });
  }


  addNewTicket(ticketForm) {
    this.ticketService.create(ticketForm.value).toPromise().then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Add new Ticket',
        text: 'Ticket created correctly'
      });
      this.goBack()
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
