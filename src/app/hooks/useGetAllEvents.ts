import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Event } from '../Types'

export interface EventResponse {
  data: Event[]
}

export default function useGetAllEvents() {
  const { data, isLoading, error } = useQuery<EventResponse>({
    queryKey: ['event'],
    queryFn: async () => {
      try {
        const { data } = await axios.get<EventResponse>(
          "/api/getevent",
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
