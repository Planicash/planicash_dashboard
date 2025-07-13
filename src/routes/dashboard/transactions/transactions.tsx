import { useState } from "preact/hooks"
import { Plus, Edit, Trash2, ArrowUpRight, ArrowDownLeft } from "lucide-preact"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TransactionModal } from "@/components/modals/transaction-modal"
import type { Transaction } from "./utils/transactions"
import { mockTransactions } from "./utils/transactions.data"
import { Label } from "@/components/ui/label"

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const handleCreate = () => {
    setEditingTransaction(null)
    setIsModalOpen(true)
  }

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setTransactions((transactions) => transactions.filter((t) => t.id !== id))
  }

  const handleSave = (transaction: Omit<Transaction, "id">) => {
    if (editingTransaction) {
      setTransactions((transactions) =>
        transactions.map((t) => (t.id === editingTransaction.id ? { ...transaction, id: editingTransaction.id } : t))
      )
    } else {
      const newTransaction = { ...transaction, id: Date.now().toString() }
      setTransactions((transactions) => [...transactions, newTransaction])
    }
    setIsModalOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const totalIncome = transactions
    .filter((t) => t.type === "income" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === "expense" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="title">Transactions</h1>
          <p className=" text-slate-900 transition-colors dark:text-slate-50">Track all your financial transactions</p>
        </div>
        <Button onClick={handleCreate} className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800">
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-300">${totalIncome.toLocaleString()}</p>
              </div>
              <ArrowUpRight className="h-8 w-8 text-green-600 dark:text-green-300" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900 dark:to-red-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-300">${totalExpenses.toLocaleString()}</p>
              </div>
              <ArrowDownLeft className="h-8 w-8 text-red-600 dark:text-red-300" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Balance</p>
                <p
                  className={`text-2xl font-bold ${totalIncome - totalExpenses >= 0 ? "text-blue-600 dark:text-blue-300" : "text-red-600 dark:text-red-300"}`}
                >
                  ${(totalIncome - totalExpenses).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "income"
                        ? "bg-green-100 dark:bg-green-900"
                        : "bg-red-100 dark:bg-red-900"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-300" />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4 text-red-600 dark:text-red-300" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 transition-colors dark:text-slate-50">{transaction.description}</h3>
                    <Label className="text-sm text-muted-foreground">
                      {transaction.category} • {transaction.paymentMethod}
                    </Label>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.type === "income" ? "text-green-600 dark:text-green-300" : "text-red-600 dark:text-red-300"}`}>
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-sm  text-slate-900 transition-colors dark:text-slate-50">{transaction.date}</p>
                  </div>
                  <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(transaction)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        transaction={editingTransaction}
      />
    </div>
  )
}
