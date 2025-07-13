import { useState, useEffect } from "preact/hooks"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Transaction, TransactionModalProps } from "./types"



export function TransactionModal({ isOpen, onClose, onSave, transaction }: TransactionModalProps) {
  const today = new Date().toISOString().split("T")[0]

  const [formData, setFormData] = useState<Omit<Transaction, "id">>({
    description: "",
    amount: 0,
    type: "expense",
    category: "",
    date: today,
    paymentMethod: "",
    status: "completed",
  })

  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
        date: transaction.date,
        paymentMethod: transaction.paymentMethod,
        status: transaction.status,
      })
    } else {
      setFormData({
        description: "",
        amount: 0,
        type: "expense",
        category: "",
        date: today,
        paymentMethod: "",
        status: "completed",
      })
    }
  }, [transaction, isOpen])

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] card">
        <DialogHeader>
          <DialogTitle className="title">{transaction ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"

              id="description"
              value={formData.description}
              onInput={(e) =>
                setFormData({ ...formData, description: (e.target as HTMLInputElement).value })
              }
              placeholder="e.g., Grocery shopping"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"

                id="amount"
                type="number"
                value={formData.amount}
                onInput={(e) =>
                  setFormData({ ...formData, amount: parseFloat((e.target as HTMLInputElement).value) || 0 })
                }
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: Transaction["type"]) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"

              id="category"
              value={formData.category}
              onInput={(e) =>
                setFormData({ ...formData, category: (e.target as HTMLInputElement).value })
              }
              placeholder="e.g., Food, Bills, Entertainment"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"

              id="date"
              type="date"
              value={formData.date}
              onInput={(e) =>
                setFormData({ ...formData, date: (e.target as HTMLInputElement).value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Input
              className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"

              id="paymentMethod"
              value={formData.paymentMethod}
              onInput={(e) =>
                setFormData({ ...formData, paymentMethod: (e.target as HTMLInputElement).value })
              }
              placeholder="e.g., Credit Card, Bank Transfer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: Transaction["status"]) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button className="text-purple-600 border border-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:border-purple-800 dark:hover:bg-purple-900" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800 ">{transaction ? "Update" : "Create"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
