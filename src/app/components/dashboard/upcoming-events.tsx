"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../ui/button"
import { Calendar, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function UpcomingEvents() {
  const events = [
    {
      id: "1",
      title: "Digital Marketing Masterclass",
      date: "2024-02-15T10:00:00Z",
      location: "Jakarta Convention Center",
      image: "/placeholder.svg?height=80&width=80",
      ticketType: "Regular",
    },
    {
      id: "3",
      title: "Art Exhibition Opening",
      date: "2024-02-25T18:00:00Z",
      location: "National Gallery",
      image: "/placeholder.svg?height=80&width=80",
      ticketType: "VIP",
    },
  ]

  const getDaysUntil = (date: string) => {
    const eventDate = new Date(date)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => {
          const daysUntil = getDaysUntil(event.date)
          return (
            <div key={event.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{new Date(event.date).toLocaleDateString("id-ID")}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center text-sm text-purple-600 mb-2">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{daysUntil} days</span>
                </div>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                >
                  <Link href={`/events/${event.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
