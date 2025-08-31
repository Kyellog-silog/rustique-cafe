"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Phone } from "lucide-react"

interface OrderConfirmationProps {
  orderId: string
  onNewOrder: () => void
}

export function OrderConfirmation({ orderId, onNewOrder }: OrderConfirmationProps) {
  return (
    <div className="space-y-6 text-center">
      {/* Success Icon */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Order Confirmed!</h2>
          <p className="text-muted-foreground mt-1">Thank you for your order</p>
        </div>
      </div>

      {/* Order Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Order Number:</span>
            <Badge variant="secondary" className="font-mono">
              #{orderId.slice(-8).toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status:</span>
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
              <Clock className="w-3 h-3 mr-1" />
              Pending
            </Badge>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground mb-2">We're preparing your order!</p>
            <p className="text-sm text-muted-foreground">
              You'll receive updates on your order status. For questions, please contact us.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>Questions? Call us at (555) 123-4567</span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Button onClick={onNewOrder} className="w-full">
          Place Another Order
        </Button>
        <Button variant="outline" className="w-full bg-transparent">
          View Order History
        </Button>
      </div>
    </div>
  )
}
