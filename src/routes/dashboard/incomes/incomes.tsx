
import { useState } from "preact/hooks"
import { Plus, Edit, Trash2, TrendingUp } from "lucide-preact"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IncomeModal } from "@/components/modals/income-modal"
import type { Income } from "./utils/incomes"
import { mockIncomes } from "./utils/incomes.data"
import { Label } from "@/components/ui/label"



export default function IncomesPage() {
  const [incomes, setIncomes] = useState<Income[]>(mockIncomes)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingIncome, setEditingIncome] = useState<Income | null>(null)

  const handleCreate = () => {
    setEditingIncome(null)
    setIsModalOpen(true)
  }

  const handleEdit = (income: Income) => {
    setEditingIncome(income)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setIncomes((incomes) => incomes.filter((i) => i.id !== id))
  }

  const handleSave = (income: Omit<Income, "id">) => {
    if (editingIncome) {
      setIncomes((incomes) => incomes.map((i) => (i.id === editingIncome.id ? { ...income, id: editingIncome.id } : i)))
    } else {
      const newIncome = { ...income, id: Date.now().toString() }
      setIncomes((incomes) => [...incomes, newIncome])
    }
    setIsModalOpen(false)
  }

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "monthly":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "weekly":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "yearly":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "one-time":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }


  const totalMonthlyIncome = incomes
    .filter((i) => i.status === "active")
    .reduce((total, income) => {
      if (income.frequency === "monthly") return total + income.amount
      if (income.frequency === "weekly") return total + income.amount * 4.33
      if (income.frequency === "yearly") return total + income.amount / 12
      return total
    }, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="title">Income Sources</h1>
          <p className="text-gray-600">Track and manage your income streams</p>
        </div>
        <Button onClick={handleCreate} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Income
        </Button>
      </div>

      <Card className="card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Monthly Income</p>
              <p className="text-3xl font-bold text-green-600">${totalMonthlyIncome.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-12 w-12 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {incomes.map((income) => (
          <Card key={income.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 ">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{income.source}</CardTitle>
                <Badge
                  variant={income.status === "active" ? "default" : "secondary"}
                  className={income.status === "active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : ""}
                >
                  {income.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Amount</Label>
                  <span className="text-lg font-semibold text-green-600">${income.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Label>Frequency:</Label>
                  <Badge className={getFrequencyColor(income.frequency)}>{income.frequency}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <Label>Category</Label>
                  <span className=" text-sm text-slate-900 transition-colors dark:text-slate-50">{income.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Label>Next</Label>
                  <span className=" text-sm text-slate-900 transition-colors dark:text-slate-50">{income.nextDate}</span>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(income)} className="flex-1">
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(income.id)}
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

      <IncomeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        income={editingIncome}
      />
    </div>
  )
}
