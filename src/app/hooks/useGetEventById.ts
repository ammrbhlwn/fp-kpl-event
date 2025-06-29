import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useGetEventById(id: number) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const response = await axios.get(`/api/getevent/${id}`)
      return response.data.data
    },
    enabled: !!id,
  })
}
