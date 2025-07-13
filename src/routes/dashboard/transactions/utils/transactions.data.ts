import type { Transaction } from "./transactions";

export const mockTransactions: Transaction[] = [
    {
        id: "1",
        description: "Salary Payment",
        amount: 5000,
        type: "income",
        category: "Employment",
        date: "2024-01-15",
        paymentMethod: "Bank Transfer",
        status: "completed",
    },
    {
        id: "2",
        description: "Grocery Shopping",
        amount: 150,
        type: "expense",
        category: "Food",
        date: "2024-01-14",
        paymentMethod: "Credit Card",
        status: "completed",
    },
    {
        id: "3",
        description: "Utility Bill",
        amount: 200,
        type: "expense",
        category: "Bills",
        date: "2024-01-13",
        paymentMethod: "Bank Transfer",
        status: "pending",
    },
]
