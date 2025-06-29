"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../ui/button"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Calendar, MapPin, Ticket, X, Download, RefreshCw } from "lucide-react"
import Image from "next/image"
import { useToast } from "../../hooks/use-toast"

export function MyBookingsList() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Mock bookings data
    const mockBookings = [
      {
        id: "1",
        event: {
          title: "Tech Conference 2024",
          date: "2024-03-15T09:00:00Z",
          location: "Jakarta Convention Center",
          image: "/placeholder.svg?height=200&width=300",
          type: "conference",
        },
        tickets: [{ type: "VIP", quantity: 2, price: 300000 }],
        status: "confirmed",
        totalPrice: 600000,
        bookingDate: "2024-02-01T10:00:00Z",
        canCancel: true,
      },
      {
        id: "2",
        event: {
          title: "Digital Marketing Masterclass",
          date: "2024-02-20T14:00:00Z",
          location: "Balai Sarbini",
          image: "/placeholder.svg?height=200&width=300",
          type: "seminar",
        },
        tickets: [{ type: "Regular", quantity: 1, price: 250000 }],
        status: "confirmed",
        totalPrice: 250000,
        bookingDate: "2024-01-15T09:00:00Z",
        canCancel: false,
      },
      {
        id: "3",
        event: {
          title: "Jazz Night Concert",
          date: "2024-01-30T19:00:00Z",
          location: "Taman Ismail Marzuki",
          image: "/placeholder.svg?height=200&width=300",
          type: "concert",
        },
        tickets: [{ type: "VVIP", quantity: 1, price: 500000 }],
        status: "cancelled",
        totalPrice: 500000,
        bookingDate: "2024-01-10T16:00:00Z",
        canCancel: false,
      },
    ]

    setTimeout(() => {
      setBookings(mockBookings)
      setLoading(false)
    }, 1000)
  }, [])

  const handleCancelBooking = async (bookingId: string) => {
    setCancellingId(bookingId)

    try {
      // Simulate cancellation API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? { ...booking, status: "cancelled", canCancel: false } : booking,
        ),
      )

      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully. Refund will be processed within 3-5 business days.",
      })
    } catch (error) {
      toast({
        title: "Cancellation Failed",
        description: "Unable to cancel booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setCancellingId(null)
    }
  }

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

  const getTicketBadgeColor = (ticketType: string) => {
    switch (ticketType.toLowerCase()) {
      case "regular":
        return "bg-blue-100 text-blue-800"
      case "vip":
        return "bg-purple-100 text-purple-800"
      case "vvip":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filterBookings = (status?: string) => {
    if (!status) return bookings
    return bookings.filter((booking) => booking.status === status)
  }

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex space-x-4">
          <div className="relative h-24 w-32 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={booking.event.image || "/placeholder.svg"}
              alt={booking.event.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900 truncate">{booking.event.title}</h3>
              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
            </div>

            <div className="space-y-1 text-sm text-gray-600 mb-3">
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
                <MapPin className="h-4 w-4 mr-2" />
                <span className="truncate">{booking.event.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Ticket className="h-4 w-4 text-gray-400" />
                {booking.tickets.map((ticket: any, index: number) => (
                  <Badge key={index} className={getTicketBadgeColor(ticket.type)} variant="outline">
                    {ticket.quantity}x {ticket.type}
                  </Badge>
                ))}
              </div>
              <p className="font-bold text-purple-600">Rp {booking.totalPrice.toLocaleString("id-ID")}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <p className="text-xs text-gray-500">Booked on {new Date(booking.bookingDate).toLocaleDateString("id-ID")}</p>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>

            {booking.canCancel && booking.status === "confirmed" && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleCancelBooking(booking.id)}
                disabled={cancellingId === booking.id}
              >
                {cancellingId === booking.id ? (
                  <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <X className="h-4 w-4 mr-1" />
                )}
                {cancellingId === booking.id ? "Cancelling..." : "Cancel"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse flex space-x-4">
                <div className="h-24 w-32 bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <Tabs defaultValue="all" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">All Bookings ({bookings.length})</TabsTrigger>
        <TabsTrigger value="confirmed">Confirmed ({filterBookings("confirmed").length})</TabsTrigger>
        <TabsTrigger value="pending">Pending ({filterBookings("pending").length})</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled ({filterBookings("cancelled").length})</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        {bookings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600">Start exploring events and make your first booking!</p>
            </CardContent>
          </Card>
        ) : (
          bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
        )}
      </TabsContent>

      <TabsContent value="confirmed" className="space-y-4">
        {filterBookings("confirmed").map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </TabsContent>

      <TabsContent value="pending" className="space-y-4">
        {filterBookings("pending").map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </TabsContent>

      <TabsContent value="cancelled" className="space-y-4">
        {filterBookings("cancelled").map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </TabsContent>
    </Tabs>
  )
}
