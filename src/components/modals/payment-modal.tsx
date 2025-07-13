"use client"

import { useState, useEffect } from "preact/hooks"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { PaymentMethod, PaymentMethodModalProps } from "./types"


export function PaymentMethodModal({
  isOpen,
  onClose,
  onSave,
  method,
}: PaymentMethodModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "credit" as PaymentMethod["type"],
    number: "",
    status: "active" as PaymentMethod["status"],
  })

  useEffect(() => {
    if (method) {
      setFormData({
        name: method.name,
        type: method.type,
        number: method.number,
        status: method.status,
      })
    } else {
      setFormData({
        name: "",
        type: "credit",
        number: "",
        status: "active",
      })
    }
  }, [method, isOpen])

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] card">
        <DialogHeader>
          <DialogTitle className="title">
            {method ? "Edit Payment Method" : "Add Payment Method"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"
              id="name"
              value={formData.name}
              onInput={(e) =>
                setFormData({
                  ...formData,
                  name: (e.target as HTMLInputElement).value,
                })
              }
              placeholder="e.g., Visa Principal"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: PaymentMethod["type"]) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit">Credit Card</SelectItem>
                <SelectItem value="debit">Debit Card</SelectItem>
                <SelectItem value="bank">Bank Account</SelectItem>
                <SelectItem value="digital">Digital Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="number">Number/Identifier</Label>
            <Input
              className=" bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"


              id="number"
              value={formData.number}
              onInput={(e) =>
                setFormData({
                  ...formData,
                  number: (e.target as HTMLInputElement).value,
                })
              }
              placeholder="e.g., **** 1234 or email@example.com"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.status === "active"}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  status: checked ? "active" : "inactive",
                })
              }
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button>{method ? "Update" : "Create"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
