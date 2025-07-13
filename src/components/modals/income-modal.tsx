import { useEffect, useState } from "preact/hooks"
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
import type { IncomeModalProps } from "./types"
import type { Income } from "@/routes/dashboard/incomes/utils/incomes"


export function IncomeModal({ isOpen, onClose, onSave, income }: IncomeModalProps) {
  const [formData, setFormData] = useState({
    source: "",
    amount: 0,
    frequency: "monthly" as Income["frequency"],
    category: "",
    status: "active" as Income["status"],
    nextDate: "",
  })

  useEffect(() => {
    if (income) {
      setFormData({
        source: income.source,
        amount: income.amount,
        frequency: income.frequency,
        category: income.category,
        status: income.status,
        nextDate: income.nextDate || "",
      })
    } else {
      setFormData({
        source: "",
        amount: 0,
        frequency: "monthly",
        category: "",
        status: "active",
        nextDate: "",
      })
    }
  }, [income, isOpen])

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    onSave({
      ...formData,
      nextDate: formData.nextDate || undefined,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] card">
        <DialogHeader>
          <DialogTitle className="title">{income ? "Edit Income Source" : "Add Income Source"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"
              id="source"
              value={formData.source}
              onInput={(e) => setFormData({ ...formData, source: (e.target as HTMLInputElement).value })}
              placeholder="e.g., Salary, Freelance"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"
              id="amount"
              type="number"
              value={formData.amount}
              onInput={(e) =>
                setFormData({
                  ...formData,
                  amount: parseFloat((e.target as HTMLInputElement).value) || 0,
                })
              }
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select
              value={formData.frequency}
              onValueChange={(value: string) => setFormData({ ...formData, frequency: value as Income["frequency"] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="one-time">One-time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"
              id="category"
              value={formData.category}
              onInput={(e) => setFormData({ ...formData, category: (e.target as HTMLInputElement).value })}
              placeholder="e.g., Employment, Investment"
              required
            />
          </div>

          {formData.frequency !== "one-time" && (
            <div className="space-y-2">
              <Label htmlFor="nextDate">Next Expected Date</Label>
              <Input
                className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"
                id="nextDate"
                type="date"
                value={formData.nextDate}
                onInput={(e) => setFormData({ ...formData, nextDate: (e.target as HTMLInputElement).value })}
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.status === "active"}
              onCheckedChange={(checked: boolean) =>
                setFormData({ ...formData, status: checked ? "active" : "inactive" })
              }
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button  className="text-green-600 border border-green-600 hover:bg-green-100 dark:text-green-400 dark:border-green-800 " variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button  className="bg-green-600 hover:bg-green-700" >{income ? "Update" : "Create"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}