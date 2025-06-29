import { BookTicketInput } from "../../infrastructure/interface/bookTicketInput"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const token = localStorage.getItem("token")

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(name: string, email: string, password: string) {
    return this.request("/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    })
  }

  // Events endpoints
  async getEvents(filters?: any) {
    const params = new URLSearchParams(filters)
    return this.request(`/events?${params}`)
  }

  async getEvent(id: string) {
    return this.request(`/events/${id}`)
  }

  async createBooking(data: BookTicketInput) {
    return this.request<{ data: any }>("/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }  
  
  async getUserBookings() {
    return this.request("/bookings/user")
  }
}

export const api = new ApiClient(API_BASE_URL)
