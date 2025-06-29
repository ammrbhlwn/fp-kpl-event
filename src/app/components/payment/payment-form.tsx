"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Separator } from "../../../components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { CreditCard, Smartphone, Building2, Wallet, Shield, Lock } from "lucide-react"

interface PaymentFormProps {
  bookingId: string
}

export function PaymentForm({ bookingId }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const paymentMethods = [
    {
      id: "credit-card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express",
    },
    {
      id: "gopay",
      name: "GoPay",
      icon: Smartphone,
      description: "Pay with your GoPay balance",
    },
    {
      id: "ovo",
      name: "OVO",
      icon: Smartphone,
      description: "Pay with your OVO balance",
    },
    {
      id: "dana",
      name: "DANA",
      icon: Wallet,
      description: "Pay with your DANA balance",
    },
    {
      id: "bank-transfer",
      name: "Bank Transfer",
      icon: Building2,
      description: "BCA, Mandiri, BNI, BRI",
    },
  ]

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Payment Successful!",
        description: "Your tickets have been confirmed. Check your email for details.",
      })

      router.push(`/booking-confirmation/${bookingId}`)
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Security Notice */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">Secure Payment</p>
              <p className="text-xs text-green-600">Your payment information is encrypted and secure</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value={method.id} id={method.id} />
                <method.icon className="h-6 w-6 text-gray-600" />
                <div className="flex-1">
                  <Label htmlFor={method.id} className="font-medium cursor-pointer">
                    {method.name}
                  </Label>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="h-5 w-5 mr-2" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayment} className="space-y-6">
            {paymentMethod === "credit-card" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input id="cardName" placeholder="John Doe" required />
                </div>
              </div>
            )}

            {(paymentMethod === "gopay" || paymentMethod === "ovo" || paymentMethod === "dana") && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input id="phoneNumber" placeholder="+62 812 3456 7890" required />
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    You will receive a push notification to complete the payment in your {paymentMethod.toUpperCase()}{" "}
                    app.
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === "bank-transfer" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Bank</Label>
                  <RadioGroup defaultValue="bca" className="grid grid-cols-2 gap-4">
                    {["BCA", "Mandiri", "BNI", "BRI"].map((bank) => (
                      <div key={bank} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value={bank.toLowerCase()} id={bank} />
                        <Label htmlFor={bank} className="cursor-pointer">
                          {bank}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    You will receive bank transfer instructions after clicking "Pay Now".
                  </p>
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Billing Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" required />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Processing Payment..." : "Pay Now"}
            </Button>

            <div className="text-center text-xs text-gray-500">
              <p>By completing this payment, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
