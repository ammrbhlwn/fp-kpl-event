import { Header } from "../../components/layout/header"
import { Footer } from "../../components/layout/footer"
import { MyBookingsList } from "../../components/bookings/my-bookings-list"

export default function MyBookingsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your event tickets and bookings</p>
        </div>
        <MyBookingsList />
      </main>
      <Footer />
    </div>
  )
}
