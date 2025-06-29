import { TicketType } from "../valueObject/TicketType";

export interface Ticket {
    id: number;
    eventId: number;
    types: TicketType
    price: number;
    quantity: number;
}