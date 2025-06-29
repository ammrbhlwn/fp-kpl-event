"use client"

import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../ui/button"
import { Badge } from "../../components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Event } from "../../Types"
import useGetAllEvents from "../../hooks/useGetAllEvents"

export function EventsGrid() {
  const { data, isLoading, error } = useGetAllEvents()
  const events: Event[] = data?.data ?? []

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg" />
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500">Gagal memuat data: {(error as Error).message}</p>
  }

  if (!events.length) {
    return <p className="text-center text-gray-600">Belum ada event tersedia.</p>
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event.id} className="card-hover border-0 shadow-lg overflow-hidden">
          <div className="relative h-48">
            {/* <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" /> */}
            <Image src={"/placeholder.svg"} alt={event.name} fill className="object-cover" />
            <Badge className="absolute top-4 left-4 bg-purple-600 capitalize">{event.types}</Badge>
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{event.name}</h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">{new Date(event.date).toLocaleDateString("id-ID")}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.location}</span>
              </div>
              {/* <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.organizer}</span>
              </div> */}
            </div>

            <div className="flex items-center justify-self-end">
              {/* <span className="text-lg font-bold text-purple-600">
                From Rp {event.ticketTypes[0]?.price.toLocaleString("id-ID")}
              </span> */}
              <Button asChild size="sm">
                <Link href={`/events/${event.id}`}>View Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
