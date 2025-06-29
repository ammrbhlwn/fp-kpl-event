import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { MyTicket } from '@/entities/models/MyTicket'

export interface TicketResponse {
  data: MyTicket[]
}

export default function useGetAllTickets() {
  const { data, isLoading, error } = useQuery<TicketResponse>({
    queryKey: ['ticket'],
    queryFn: async () => {
      try {
        const { data } = await axios.get<TicketResponse>(
          "/api/myticket",
        )
        return data
      } catch (error) {
        console.error('API Error:', error)
        throw new Error(error instanceof Error ? error.message : String(error))
      }
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
  return { data, isLoading, error }
}
