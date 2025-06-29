import { Header } from "../../../components/layout/header"
import { Footer } from "../../../components/layout/footer"
import { BookingConfirmation } from "../../../components/booking/booking-confirmation"

interface BookingConfirmationPageProps {
  params: {
    bookingId: string
  }
}

export default function BookingConfirmationPage({ params }: BookingConfirmationPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <BookingConfirmation bookingId={params.bookingId} />
      </main>
      <Footer />
    </div>
  )
}
