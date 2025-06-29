import { Header } from "../../../components/layout/header"
import { EventDetails } from "../../../components/events/event-details"
import { BookingSection } from "../../../components/booking/booking-section"
import { Footer } from "../../../components/layout/footer"

interface Props {
  params: { id: number }
}

export default function EventPage({ params }: Props) {
  const id = params.id

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EventDetails eventId={id} />
          </div>
          <div className="lg:col-span-1">
            <BookingSection eventId={id} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}