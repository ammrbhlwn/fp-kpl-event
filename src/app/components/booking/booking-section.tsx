"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../ui/button"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useAuth } from "../../providers/auth-provider"
import { Ticket, AlertCircle, Users, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "../../hooks/use-toast"
import { useBookingMutation } from "../../hooks/useBookingMutation"
import useGetEventById from "../../hooks/useGetEventById"
import { TicketType } from "../../Types"

export function BookingSection({ eventId }: { eventId: number }) {
  // const { data: event, isLoading } = useGetEventById(eventId)
  const [selectedTicketType, setSelectedTicketType] = useState("")
  const [quantity, setQuantity] = useState(1)

  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const bookingMutation = useBookingMutation()

  const event = {
    id: 1,
    name: "Konser Musik Indie 2025",
    maxTicketsPerUser: 5,
    ticketTypes: [
      {
        id: "regular-id",
        name: "Regular",
        price: 100000,
        quota: 100,
        available: 40,
        description: "Akses umum tanpa tempat duduk khusus.",
      },
      {
        id: "vip-id",
        name: "VIP",
        price: 250000,
        quota: 50,
        available: 15,
        description: "Termasuk tempat duduk depan + souvenir eksklusif.",
      },
      {
        id: "vvip-id",
        name: "VVIP",
        price: 500000,
        quota: 20,
        available: 3,
        description: "Akses backstage dan meet & greet dengan artis.",
      },
    ],
  }

  const selectedTicket = event?.ticketTypes?.find((t: TicketType) => t.id === selectedTicketType)
  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0

  const isLoading = false

  const handleBooking = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to book tickets.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!selectedTicket) {
      toast({
        title: "Error",
        description: "Please select a ticket type.",
        variant: "destructive",
      })
      return
    }

    bookingMutation.mutate(
      {
        eventId,
        ticketType: selectedTicket.name as "Regular" | "VIP" | "VVIP",
        quantity,
        userId: "1",
      } as any,
      {
        onSuccess: ({ data }) => {
          toast({
            title: "Booking created!",
            description: "Redirecting to payment...",
          })
          router.push(`/payment/${data.id}`)
        },
        onError: (err: any) => {
          toast({
            title: "Booking failed",
            description:
              err?.response?.data?.error ?? "Something went wrong, please try again.",
            variant: "destructive",
          })
        },
      }
    )
  }

  const getTicketBadgeColor = (ticketName: string) => {
    switch (ticketName.toLowerCase()) {
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

  if (isLoading) {
    return (
      <Card className="sticky top-4">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!event) {
    return null
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Ticket className="h-5 w-5 mr-2" />
          Book Tickets
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Ticket Type</label>
          <Select value={selectedTicketType} onValueChange={setSelectedTicketType}>
            <SelectTrigger>
              <SelectValue placeholder="Select ticket type" />
            </SelectTrigger>
            <SelectContent>
              {event?.ticketTypes?.map((ticket: TicketType) => (
                <SelectItem key={ticket.id} value={ticket.id}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <span>{ticket.name}</span>
                      {ticket.name === "VIP" && <Star className="h-3 w-3 text-purple-500" />}
                      {ticket.name === "VVIP" && <Star className="h-3 w-3 text-yellow-500" />}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">Rp {ticket.price.toLocaleString("id-ID")}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedTicket && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{selectedTicket.name}</h3>
                  <Badge className={getTicketBadgeColor(selectedTicket.name)}>{selectedTicket.name}</Badge>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{selectedTicket.available} left</span>
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{selectedTicket.description}</p>
              <p className="text-lg font-bold text-purple-600">Rp {selectedTicket.price.toLocaleString("id-ID")}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity (Max {event.maxTicketsPerUser})</label>
              <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: Math.min(event?.maxTicketsPerUser ?? 5, selectedTicket.available) }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1} ticket{i > 0 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total Price</span>
                <span className="text-xl font-bold text-purple-600">Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>

              {selectedTicket.available < 10 && (
                <div className="flex items-start space-x-2 p-3 bg-red-50 rounded-lg mb-4">
                  <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                  <p className="text-sm text-red-800">
                    Only {selectedTicket.available} tickets left! Book now to secure your spot.
                  </p>
                </div>
              )}

              <Button
                className="w-full"
                onClick={handleBooking}
                disabled={bookingMutation.isPending || selectedTicket.available === 0}
                size="lg"
              >
                {bookingMutation.isPending
                  ? "Creating Booking..."
                  : selectedTicket.available === 0
                    ? "Sold Out"
                    : "Book Now"}
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Tickets are non-refundable but can be cancelled up to 24h before event</p>
          <p>• Please arrive 30 minutes before the event</p>
          <p>• Bring a valid ID for verification</p>
          <p>• Free cancellation available until 24 hours before event</p>
        </div>
      </CardContent>
    </Card>
  )
}
