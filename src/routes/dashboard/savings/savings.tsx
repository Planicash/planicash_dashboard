// @jsxImportSource preact
import { useState } from "preact/hooks"
import { Plus, Edit, Trash2, PiggyBank, Target } from "lucide-preact"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SavingsModal } from "@/components/modals/savings-modal"
import { Label } from "@/components/ui/label"
import type { Savings } from "./utils/savings"
import { mockSavings } from "./utils/savings.data"



export default function SavingsPage() {
  const [savings, setSavings] = useState<Savings[]>(mockSavings)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSaving, setEditingSaving] = useState<Savings | null>(null)

  const handleCreate = () => {
    setEditingSaving(null)
    setIsModalOpen(true)
  }

  const handleEdit = (saving: Savings) => {
    setEditingSaving(saving)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setSavings((savings) => savings.filter((s) => s.id !== id))
  }

  const handleSave = (saving: Omit<Savings, "id">) => {
    if (editingSaving) {
      setSavings((savings) =>
        savings.map((s) => (s.id === editingSaving.id ? { ...saving, id: editingSaving.id } : s))
      )
    } else {
      const newSaving = { ...saving, id: Date.now().toString() }
      setSavings((savings) => [...savings, newSaving])
    }
    setIsModalOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "emergency":
        return "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100"
      case "vacation":
        return "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-100"
      case "retirement":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "investment":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100"
      case "other":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const totalSaved = savings.reduce((sum, s) => sum + s.currentAmount, 0)
  const totalTarget = savings.reduce((sum, s) => sum + s.targetAmount, 0)
  const totalMonthly = savings
    .filter((s) => s.status === "active")
    .reduce((sum, s) => sum + s.monthlyContribution, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="title">Aportes y Ahorros</h1>
          <p className="text-slate-900 dark:text-slate-50">Manage your savings goals and contributions</p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-pink-600 hover:bg-pink-700 text-white dark:bg-pink-700 dark:hover:bg-pink-800"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Savings Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-rose-50 to-pink-100 dark:from-pink-900 dark:to-fuchsia-900">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Saved</p>
                <p className="text-2xl font-bold text-pink-600 dark:text-pink-200">${totalSaved.toLocaleString()}</p>
              </div>
              <PiggyBank className="h-8 w-8 text-pink-600 dark:text-pink-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-fuchsia-50 to-violet-100 dark:from-fuchsia-900 dark:to-violet-900">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Target</p>
                <p className="text-2xl font-bold text-violet-600 dark:text-violet-200">${totalTarget.toLocaleString()}</p>
              </div>
              <Target className="h-8 w-8 text-violet-600 dark:text-violet-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-fuchsia-100 to-pink-100 dark:from-fuchsia-800 dark:to-pink-900">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Contributions</p>
                <p className="text-2xl font-bold text-fuchsia-600 dark:text-fuchsia-200">${totalMonthly.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savings.map((saving) => {
          const progress = (saving.currentAmount / saving.targetAmount) * 100
          return (
            <Card key={saving.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="title">{saving.name}</CardTitle>
                  <div className="flex space-x-2">
                    <Badge className={getCategoryColor(saving.category)}>{saving.category}</Badge>
                    <Badge className={getStatusColor(saving.status)}>{saving.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Label className="text-sm text-muted-foreground">{saving.description}</Label>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Progress</Label>
                    <span className="font-semibold text-slate-900 transition-colors dark:text-slate-50">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="font-semibold text-slate-900 transition-colors dark:text-slate-50">${saving.currentAmount.toLocaleString()}</span>
                    <span className="font-semibold text-slate-900 transition-colors dark:text-slate-50">${saving.targetAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label>Monthly:</Label>
                    <p className="font-semibold text-slate-900 transition-colors dark:text-slate-50">${saving.monthlyContribution.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Target Date:</Label>
                    <p className="font-semibold text-slate-900 transition-colors dark:text-slate-50">{saving.targetDate}</p>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                   <Button variant="outline" size="sm" onClick={() => handleEdit(saving)} className="flex-1">
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(saving.id)}
                    className="flex-1"
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <SavingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        saving={editingSaving}
      />
    </div>
  )
}
