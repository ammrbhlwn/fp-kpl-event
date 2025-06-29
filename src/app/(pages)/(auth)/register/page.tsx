import { RegisterForm } from "../../../components/auth/register-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="w-full max-w-md mx-auto lg:order-2">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
              <CardDescription className="text-gray-600">Join EventHub to start booking amazing events</CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="hidden lg:block lg:order-1">
          <div className="relative h-[600px] rounded-2xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=500"
              alt="Join EventHub illustration"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Join EventHub</h2>
              <p className="text-lg opacity-90">Start your event journey today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
