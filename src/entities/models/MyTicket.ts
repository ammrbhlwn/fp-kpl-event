import { MyTicketStatus } from "../valueObject/MyTicketStatus";

export interface MyTicket{
    id: number;
    eventId: number;
    ticketId: number;
    types: string;
    quantity: number;
    totalPrice: number;
    purchaseDate: Date;
    status: MyTicketStatus;
    userId: string;
}