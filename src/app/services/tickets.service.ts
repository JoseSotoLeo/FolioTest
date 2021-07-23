import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Ticket } from '../models/Ticket.model';
import { catchError, map } from 'rxjs/operators';


// const API_URL = "https://crudcrud.com/api/";
// const API_KEY = "4cb34bb3886f4f859b95dca5c381fdd4";

const API_URL = '/api'
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }

  create(newTicketInfo): Observable<any> {
    let ticket: Ticket = this.fTicket(newTicketInfo.message);
    console.log(ticket);

    return this.http.post<Ticket>(API_URL + '/tickets', JSON.stringify(ticket), HTTP_OPTIONS).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  update(ticket: Ticket): Observable<any> {


    return this.http.put<Ticket>(API_URL + '/tickets/' + ticket.id, ticket).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }


  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(API_URL + '/tickets').pipe(
      map(res => {
        return this.sortArray(res)
      }),
      catchError(e => {
        return throwError(e);
      })
    )
  }

  getTicketById(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(API_URL + '/tickets/' + id).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  private sortArray(arrayTickets: Ticket[]): Ticket[] {

    arrayTickets.sort(function (a, b) {
      return (a.answered === b.answered) ? 0 : a ? -1 : 1
    })
    arrayTickets.sort((a, b) => {
      if (!a.answered) { return <any>new Date(b.date) - <any>new Date(a.date); }
    });

    return arrayTickets
  }


  private fTicket(ticketMessage): Ticket {
    let formedTicket: Ticket = {
      author: localStorage.getItem('Username'),
      date: new Date(),
      message: ticketMessage,
      answer: '',
      answerAuthor: '',
      answered: false,
      closingDate: null
    }
    return formedTicket
  }
}
