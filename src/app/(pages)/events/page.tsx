import { Header } from "../../components/layout/header"
import { EventsGrid } from "../../components/events/events-grid"
import { EventFilters } from "../../components/events/event-filters"
import { Footer } from "../../components/layout/footer"

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Events</h1>
          <p className="text-gray-600">Discover seminars, concerts, and exhibitions</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <EventFilters />
          </div>
          <div className="lg:col-span-3">
            <EventsGrid />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
