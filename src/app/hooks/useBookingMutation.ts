import { useMutation } from "@tanstack/react-query";
import { BookTicketInput } from "../../infrastructure/interface/bookTicketInput";
import { api } from "../lib/api";

interface BookingResponse {
    id: string
    [key: string]: any
}

export function useBookingMutation() {
  return useMutation<BookingResponse, Error, BookTicketInput>({
    mutationFn: (data) => api.createBooking(data).then((r) => r.data),
  })
}