'use client'

import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import Image from "next/image"
import useGetEventById from "../../hooks/useGetEventById"

interface EventDetailsProps {
  eventId: string
}

export function EventDetails({ eventId }: EventDetailsProps) {
  const { data: event, isLoading, error } = useGetEventById(eventId)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
      </div>
    )
  }

  if (error || !event) {
    return <div>Event not found or failed to load.</div>
  }

  return (
    <div className="space-y-6">
      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
        <Image src={"/placeholder.svg"} alt={event.name} fill className="object-cover" />
        {/* <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-purple-600 mb-2 capitalize">{event.types}</Badge>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{event.name}</h1>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-3 text-purple-600" />
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-sm">
                    {new Date(event.date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm">
                    {new Date(event.date).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-3 text-purple-600" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-3 text-purple-600" />
                <div>
                  <p className="font-medium">Organizer</p>
                  {/* <p className="text-sm">{event.organizer ?? "-"}</p> */}
                  <p className="text-sm">-</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-3 text-purple-600" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-sm">Full Day Event</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About This Event</h2>
            <div className="prose prose-gray max-w-none">
              {event.description.split("\n").map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
