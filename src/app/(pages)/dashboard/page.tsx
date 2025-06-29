import { Header } from "../../components/layout/header"
import { DashboardStats } from "../../components/dashboard/dashboard-stats"
import { RecentBookings } from "../../components/dashboard/recent-bookings"
import { UpcomingEvents } from "../../components/dashboard/upcoming-events"
import { Footer } from "../../components/layout/footer"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your event overview</p>
        </div>

        <div className="space-y-8">
          <DashboardStats />

          <div className="grid lg:grid-cols-2 gap-8">
            <RecentBookings />
            <UpcomingEvents />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
