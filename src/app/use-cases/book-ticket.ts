import { BookTicketInput } from "../../infrastructure/interface/bookTicketInput";
import { bookTicket } from "../../infrastructure/repositories/addMyTicketToDB";

export async function bookTicketUseCase(input: BookTicketInput) {
  return await bookTicket(input);
} 