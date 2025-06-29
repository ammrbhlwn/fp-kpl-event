"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Separator } from "../../../components/ui/separator"
import { Calendar, MapPin, Ticket, Clock } from "lucide-react"
import Image from "next/image"

interface OrderSummaryProps {
  bookingId: string
}

export function OrderSummary({ bookingId }: OrderSummaryProps) {
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock booking data
    const mockBooking = {
      id: bookingId,
      event: {
        title: "Tech Conference 2024",
        date: "2024-03-15T09:00:00Z",
        location: "Jakarta Convention Center",
        image: "/placeholder.svg?height=200&width=300",
        type: "conference",
      },
      tickets: [
        { type: "Regular", quantity: 1, price: 150000 },
        { type: "VIP", quantity: 2, price: 300000 },
      ],
      fees: {
        service: 15000,
        processing: 5000,
      },
    }

    setTimeout(() => {
      setBooking(mockBooking)
      setLoading(false)
    }, 1000)
  }, [bookingId])

  if (loading) {
    return (
      <Card className="sticky top-4">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded" />
            <div className="h-32 bg-gray-200 rounded" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!booking) return null

  const subtotal = booking.tickets.reduce((sum: number, ticket: any) => sum + ticket.price * ticket.quantity, 0)
  const totalFees = booking.fees.service + booking.fees.processing
  const total = subtotal + totalFees

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Event Info */}
        <div className="space-y-4">
          <div className="relative h-32 rounded-lg overflow-hidden">
            <Image
              src={booking.event.image || "/placeholder.svg"}
              alt={booking.event.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <Badge className="absolute top-2 left-2 bg-purple-600 capitalize">{booking.event.type}</Badge>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">{booking.event.title}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {new Date(booking.event.date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  {new Date(booking.event.date).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{booking.event.location}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Tickets */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center">
            <Ticket className="h-4 w-4 mr-2" />
            Tickets
          </h4>
          {booking.tickets.map((ticket: any, index: number) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{ticket.type}</p>
                <p className="text-sm text-gray-600">Qty: {ticket.quantity}</p>
              </div>
              <p className="font-medium">Rp {(ticket.price * ticket.quantity).toLocaleString("id-ID")}</p>
            </div>
          ))}
        </div>

        <Separator />

        {/* Pricing Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Service Fee</span>
            <span>Rp {booking.fees.service.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Processing Fee</span>
            <span>Rp {booking.fees.processing.toLocaleString("id-ID")}</span>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-purple-600">Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-xs text-green-800 text-center">🔒 Your payment is secured with 256-bit SSL encryption</p>
        </div>
      </CardContent>
    </Card>
  )
}
