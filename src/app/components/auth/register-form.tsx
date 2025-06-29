"use client"

import type React from "react"

import { Button } from "../ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { signup } from "./actions"

export function RegisterForm() {

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          required
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            required
            className="h-11 pr-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          required
          className="h-11"
        />
      </div>

      <Button formAction={signup} className="w-full h-11">
        SignUp
      </Button>
    </form>
  )
}
