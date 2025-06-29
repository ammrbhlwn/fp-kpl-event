"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../ui/button"
import { Badge } from "../../components/ui/badge"
import { CheckCircle, Calendar, MapPin, Ticket, Download, Share2, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BookingConfirmationProps {
  bookingId: string
}

export function BookingConfirmation({ bookingId }: BookingConfirmationProps) {
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock booking confirmation data
    const mockBooking = {
      id: bookingId,
      confirmationNumber: `EVT-${bookingId.slice(-6).toUpperCase()}`,
      event: {
        title: "Tech Conference 2024",
        date: "2024-03-15T09:00:00Z",
        location: "Jakarta Convention Center, Hall A",
        image: "/placeholder.svg?height=300&width=400",
        type: "conference",
        organizer: "Tech Indonesia",
      },
      tickets: [{ type: "VIP", quantity: 2, price: 300000 }],
      totalPrice: 600000,
      paymentMethod: "Credit Card",
      bookingDate: new Date().toISOString(),
      status: "confirmed",
    }

    setTimeout(() => {
      setBooking(mockBooking)
      setLoading(false)
    }, 1000)
  }, [bookingId])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-12">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto" />
              <div className="h-32 bg-gray-200 rounded" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!booking) return null

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Header */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-800 mb-2">Booking Confirmed!</h1>
          <p className="text-green-700 mb-4">
            Your tickets have been successfully booked. Check your email for detailed information.
          </p>
          <Badge className="bg-green-600 text-white text-lg px-4 py-2">
            Confirmation: {booking.confirmationNumber}
          </Badge>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Event Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={booking.event.image || "/placeholder.svg"}
                  alt={booking.event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-purple-600 capitalize">{booking.event.type}</Badge>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{booking.event.title}</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-3 text-purple-600" />
                      <div>
                        <p className="font-medium">Date & Time</p>
                        <p className="text-sm">
                          {new Date(booking.event.date).toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-sm">
                          {new Date(booking.event.date).toLocaleTimeString("id-ID", {
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
                        <p className="text-sm">{booking.event.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Ticket className="h-5 w-5 mr-3 text-purple-600" />
                      <div>
                        <p className="font-medium">Your Tickets</p>
                        {booking.tickets.map((ticket: any, index: number) => (
                          <p key={index} className="text-sm">
                            {ticket.quantity}x {ticket.type}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card>
            <CardHeader>
              <CardTitle>Important Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">What to Bring</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Valid government-issued ID</li>
                  <li>• This confirmation email (printed or digital)</li>
                  <li>• Comfortable clothing and shoes</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-2">Arrival Instructions</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Arrive 30 minutes before event start time</li>
                  <li>• Entry gates open 1 hour before the event</li>
                  <li>• Parking is available on-site (additional fee may apply)</li>
                </ul>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-900 mb-2">Cancellation Policy</h4>
                <p className="text-sm text-red-800">
                  Free cancellation up to 24 hours before the event. After that, tickets are non-refundable but may be
                  transferred to another person.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Confirmation Number</span>
                  <span className="font-mono">{booking.confirmationNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Booking Date</span>
                  <span>{new Date(booking.bookingDate).toLocaleDateString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Payment Method</span>
                  <span>{booking.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Status</span>
                  <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total Paid</span>
                  <span className="text-purple-600">Rp {booking.totalPrice.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Tickets
                </Button>

                <Button className="w-full" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Tickets
                </Button>

                <Button className="w-full" variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Event
                </Button>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-gray-500 text-center mb-3">Need help? Contact our support team</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href="/my-bookings">View All Bookings</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium mb-2">Check Your Email</h4>
              <p className="text-sm text-gray-600">We've sent your tickets and event details to your email address.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">Add to Calendar</h4>
              <p className="text-sm text-gray-600">
                Don't forget to add this event to your calendar so you don't miss it.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Share2 className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">Share with Friends</h4>
              <p className="text-sm text-gray-600">Let your friends know you're attending this amazing event.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
