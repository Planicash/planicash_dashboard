export interface Transaction {
    id: string
    description: string
    amount: number
    type: "income" | "expense"
    category: string
    date: string
    paymentMethod: string
    status: "completed" | "pending" | "cancelled"
}
