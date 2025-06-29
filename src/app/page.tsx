import { Header } from "./components/layout/header"
import { Hero } from "./components/sections/hero"
import { FeaturedEvents } from "./components/sections/featured-events"
import { EventCategories } from "./components/sections/event-categories"
import { Footer } from "./components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <EventCategories />
        <FeaturedEvents />
      </main>
      <Footer />
    </div>
  )
}
