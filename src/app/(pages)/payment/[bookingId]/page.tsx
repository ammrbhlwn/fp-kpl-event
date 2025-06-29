import { Header } from "../../../components/layout/header"
import { Footer } from "../../../components/layout/footer"
import { PaymentForm } from "../../../components/payment/payment-form"
import { OrderSummary } from "../../../components/payment/order-summary"

interface PaymentPageProps {
  params: {
    bookingId: string
  }
}

export default function PaymentPage({ params }: PaymentPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
            <p className="text-gray-600">Secure checkout for your event tickets</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PaymentForm bookingId={params.bookingId} />
            </div>
            <div className="lg:col-span-1">
              <OrderSummary bookingId={params.bookingId} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
