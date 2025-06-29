"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Checkbox } from "../ui/checkbox"
import { Calendar, MapPin, DollarSign } from "lucide-react"

export function EventFilters() {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    dateFrom: "",
    dateTo: "",
    priceMin: "",
    priceMax: "",
    types: [] as string[],
  })

  const eventTypes = [
    { id: "seminar", label: "Seminars" },
    { id: "concert", label: "Concerts" },
    { id: "exhibition", label: "Exhibitions" },
  ]

  const handleTypeChange = (type: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      types: checked ? [...prev.types, type] : prev.types.filter((t) => t !== type),
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      dateFrom: "",
      dateTo: "",
      priceMin: "",
      priceMax: "",
      types: [],
    })
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Filters
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="search">Search Events</Label>
          <Input
            id="search"
            placeholder="Event name or keyword..."
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            Location
          </Label>
          <Input
            id="location"
            placeholder="City or venue..."
            value={filters.location}
            onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
          />
        </div>

        <div className="space-y-3">
          <Label className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Date Range
          </Label>
          <div className="space-y-2">
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))}
            />
            <Input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters((prev) => ({ ...prev, dateTo: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            Price Range (Rp)
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => setFilters((prev) => ({ ...prev, priceMin: e.target.value }))}
            />
            <Input
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => setFilters((prev) => ({ ...prev, priceMax: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label>Event Types</Label>
          <div className="space-y-2">
            {eventTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={filters.types.includes(type.id)}
                  onCheckedChange={(checked) => handleTypeChange(type.id, checked as boolean)}
                />
                <Label htmlFor={type.id} className="text-sm font-normal">
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  )
}
