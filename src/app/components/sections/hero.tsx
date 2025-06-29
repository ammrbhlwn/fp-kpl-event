import { Button } from "../ui/button"
import { Search, Calendar, MapPin, Users } from "lucide-react"
import { Input } from "../ui/input"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Amazing
            <span className="block text-yellow-300">Events Near You</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100">
            From seminars to concerts and exhibitions - find and book your perfect event experience
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto mb-12">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input placeholder="Search events..." className="pl-10 h-12 border-0 bg-gray-50 text-gray-900" />
                </div>
              </div>
              <div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input placeholder="Location" className="pl-10 h-12 border-0 bg-gray-50 text-gray-900" />
                </div>
              </div>
              <Button className="h-12 bg-purple-600 hover:bg-purple-700">Search Events</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Calendar className="h-12 w-12 text-yellow-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">1000+ Events</h3>
              <p className="text-purple-100">Discover events happening every day</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-yellow-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">50K+ Attendees</h3>
              <p className="text-purple-100">Join our growing community</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-12 w-12 text-yellow-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">100+ Cities</h3>
              <p className="text-purple-100">Events in major cities worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
