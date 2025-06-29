'use client'
import { Button } from "../ui/button"
import { Badge, Calendar, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "../ui/card"
import { Event } from "../../Types"
import useGetAllEvents from "../../hooks/useGetAllEvents"

export function FeaturedEvents() {
  const { data, isLoading } = useGetAllEvents()
  const events: Event[] = data?.data.slice(0, 3) ?? []

  if (isLoading) {
    return (
      <section className="py-16">
        {/* Skeleton 3 kolom */}
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Events</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these popular events happening soon
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <Card key={event.id} className="card-hover border-0 shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
                <Badge className="absolute top-4 left-4 bg-purple-600">{event.types}</Badge>
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
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.attendees} attendees</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-purple-600">{event.price}</span>
                  <Button asChild size="sm">
                    <Link href={`/events/${event.id}`}>Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
          >
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
