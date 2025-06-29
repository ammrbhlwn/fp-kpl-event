import { Button } from "../ui/button"
import { GraduationCap, Music, ImageIcon } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "../ui/card"

export function EventCategories() {
  const categories = [
    {
      icon: GraduationCap,
      title: "Seminars",
      description: "Educational workshops and professional development sessions",
      color: "bg-blue-500",
      href: "/events?type=seminar",
    },
    {
      icon: Music,
      title: "Concerts",
      description: "Live music performances with Regular, VIP, and VVIP tickets",
      color: "bg-purple-500",
      href: "/events?type=concert",
    },
    {
      icon: ImageIcon,
      title: "Exhibitions",
      description: "Art galleries and cultural exhibitions with Regular and VIP access",
      color: "bg-green-500",
      href: "/events?type=exhibition",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Event Categories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our diverse range of events designed to inspire, educate, and entertain
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={index} className="card-hover border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div
                    className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{category.title}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  <Button asChild variant="outline" className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50">
                    <Link href={category.href}>Explore {category.title}</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
