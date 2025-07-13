import { useState } from "react"
import { Plus, Edit, Trash2, CreditCard } from "lucide-preact"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PaymentMethodModal } from "@/components/modals/payment-modal"
import type { PaymentMethod } from "@/routes/dashboard/payments/utils/payments"
import { mockPaymentMethods } from "@/routes/dashboard/payments/utils/payments.data"
import { cn } from "@/utils/cn"
import { Label } from "@/components/ui/label"



export default function PaymentPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null)

  const handleCreate = () => {
    setEditingMethod(null)
    setIsModalOpen(true)
  }

  const handleEdit = (method: PaymentMethod) => {
    setEditingMethod(method)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setPaymentMethods((methods) => methods.filter((m) => m.id !== id))
  }

  const handleSave = (method: Omit<PaymentMethod, "id">) => {
    if (editingMethod) {
      setPaymentMethods((methods) =>
        methods.map((m) => (m.id === editingMethod.id ? { ...method, id: editingMethod.id } : m)),
      )
    } else {
      const newMethod = { ...method, id: Date.now().toString() }
      setPaymentMethods((methods) => [...methods, newMethod])
    }
    setIsModalOpen(false)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "credit":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "debit":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "bank":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "digital":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="title">Payment Methods</h1>
          <p className="text-gray-600">Manage your payment methods and cards</p>
        </div>
        <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Method
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-slate-900 transition-colors dark:text-slate-50" />
                  <CardTitle className="text-lg">{method.name}</CardTitle>
                </div>
                <Badge
                  variant={method.status === "active" ? "default" : "secondary"}
                  className={cn(
                    method.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : " text-slate-900 transition-colors dark:text-slate-50"
                  )}
                >
                  {method.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label >Type:</Label>
                  <Badge className={getTypeColor(method.type)}>{method.type}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <Label >Number:</Label>                  <span className="text-sm font-mono  text-slate-900 transition-colors dark:text-slate-50">{method.number}</span>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(method)} className="flex-1">
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(method.id)}
                    className="flex-1"
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <PaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        method={editingMethod}
      />
    </div>
  )
}
