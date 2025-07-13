// @jsxImportSource preact
import { useState, useEffect } from "preact/hooks"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Savings, SavingsModalProps } from "./types"

export function SavingsModal({ isOpen, onClose, onSave, saving }: SavingsModalProps) {
  const today = new Date().toISOString().split("T")[0]

  const [formData, setFormData] = useState<Omit<Savings, "id">>({
    name: "",
    description: "",
    currentAmount: 0,
    targetAmount: 0,
    monthlyContribution: 0,
    category: "other",
    status: "active",
    startDate: today,
    targetDate: "",
  })

  useEffect(() => {
    if (saving) {
      setFormData({ ...saving })
    } else {
      setFormData({
        name: "",
        description: "",
        currentAmount: 0,
        targetAmount: 0,
        monthlyContribution: 0,
        category: "other",
        status: "active",
        startDate: today,
        targetDate: "",
      })
    }
  }, [saving, isOpen])

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] card">
        <DialogHeader>
          <DialogTitle>{saving ? "Edit Savings Goal" : "Create Savings Goal"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Goal Name</Label>
            <Input
                          className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"

              id="name"
              value={formData.name}
              onInput={(e) =>
                setFormData({ ...formData, name: (e.target as HTMLInputElement).value })
              }
              placeholder="e.g., Emergency Fund"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
                          className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"

              id="description"
              value={formData.description}
              onInput={(e) =>
                setFormData({ ...formData, description: (e.target as HTMLTextAreaElement).value })
              }
              placeholder="Describe your savings goal"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentAmount">Current Amount</Label>
              <Input
                            className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"

                id="currentAmount"
                type="number"
                value={formData.currentAmount}
                onInput={(e) =>
                  setFormData({ ...formData, currentAmount: parseFloat((e.target as HTMLInputElement).value) || 0 })
                }
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount</Label>
              <Input
                            className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"

                id="targetAmount"
                type="number"
                value={formData.targetAmount}
                onInput={(e) =>
                  setFormData({ ...formData, targetAmount: parseFloat((e.target as HTMLInputElement).value) || 0 })
                }
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
            <Input
                          className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"

              id="monthlyContribution"
              type="number"
              value={formData.monthlyContribution}
              onInput={(e) =>
                setFormData({ ...formData, monthlyContribution: parseFloat((e.target as HTMLInputElement).value) || 0 })
              }
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value: Savings["category"]) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="emergency">Emergency Fund</SelectItem>
                <SelectItem value="vacation">Vacation</SelectItem>
                <SelectItem value="retirement">Retirement</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                            className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"

                id="startDate"
                type="date"
                value={formData.startDate}
                onInput={(e) =>
                  setFormData({ ...formData, startDate: (e.target as HTMLInputElement).value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetDate">Target Date</Label>
              <Input
                id="targetDate"
                type="date"
                value={formData.targetDate}
                onInput={(e) =>
                  setFormData({ ...formData, targetDate: (e.target as HTMLInputElement).value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: Savings["status"]) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button className="text-pink-600 border border-pink-600 hover:bg-pink-100 dark:text-pink-400 dark:border-pink-800 " variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="bg-pink-600 hover:bg-pink-700 text-white dark:bg-pink-700 dark:hover:bg-pink-800"
            >
              {saving ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
