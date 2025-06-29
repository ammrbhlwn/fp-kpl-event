"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import Image from "next/image"

export function RecentBookings() {
  const bookings = [
    {
      id: "1",
      event: {
        title: "Digital Marketing Masterclass",
        date: "2024-02-15T10:00:00Z",
        location: "Jakarta Convention Center",
        image: "/placeholder.svg?height=80&width=80",
      },
      ticketType: "Regular",
      quantity: 1,
      status: "confirmed",
      totalPrice: 250000,
    },
    {
      id: "2",
      event: {
        title: "Jazz Night Concert",
        date: "2024-02-20T19:00:00Z",
        location: "Balai Sarbini",
        image: "/placeholder.svg?height=80&width=80",
      },
      ticketType: "VIP",
      quantity: 2,
      status: "confirmed",
      totalPrice: 600000,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="flex items-center space-x-4 p-4 border rounded-lg">
            <div className="relative h-16 w-16 rounded-lg overflow-hidden">
              <Image
                src={booking.event.image || "/placeholder.svg"}
                alt={booking.event.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{booking.event.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{new Date(booking.event.date).toLocaleDateString("id-ID")}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">{booking.event.location}</span>
              </div>
            </div>

            <div className="text-right">
              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
              <p className="text-sm font-medium text-gray-900 mt-1">Rp {booking.totalPrice.toLocaleString("id-ID")}</p>
              <p className="text-xs text-gray-500">
                {booking.quantity} × {booking.ticketType}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
