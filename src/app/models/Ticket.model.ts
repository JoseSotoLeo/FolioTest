export class Ticket {
    id?: string;
    author: string;
    date: Date;
    message: string;
    answer: string;
    answerAuthor: string;

    answered: boolean;
    closingDate: Date;
}